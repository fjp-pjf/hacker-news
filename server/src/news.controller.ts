import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('stories')
  async fetchAndSaveStories(@Res() res: Response) {
    try {
      const apiStories = await lastValueFrom(this.newsService.fetchStories());
      await this.newsService.saveStories(apiStories);

      const savedStories = await this.newsService.findAll();
      const firstThirtyStories = savedStories.slice(0, 30);

      res.status(HttpStatus.OK).json(firstThirtyStories);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
