import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './models/News.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NewsService {
  constructor(
    private httpService: HttpService,
    @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
  ) {}

  fetchStories(): Observable<any> {
    const url = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';
    return this.httpService
      .get(url)
      .pipe(map((response) => response.data.hits));
  }

  async saveStories(stories: any[]): Promise<void> {
    for (const story of stories) {
      const existingStory = await this.newsModel
        .findOne({ url: story.url })
        .exec();

      if (!existingStory) {
        const newsStory = new this.newsModel({
          title: story.title,
          url: story.url,
          author: story.author,
          created_at: story.created_at,
        });
        await newsStory.save();
      }
    }
  }

  async findAll(): Promise<NewsDocument[]> {
    return await this.newsModel.find().exec();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    try {
      const stories = await lastValueFrom(this.fetchStories());

      await this.saveStories(stories);
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  }
}
