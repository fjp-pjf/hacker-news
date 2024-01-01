import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { Response } from 'express';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('stories')
  async fetchAndSaveStories(@Res() res: Response) {
    try {
      const apiStories = await this.newsService.fetchStories().toPromise();
      await this.newsService.saveStories(apiStories);
      console.log('here');
      res.status(HttpStatus.OK).json(apiStories);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get('saved-stories')
  async getSavedStories(@Res() res: Response) {
    try {
      const savedStories = await this.newsService.findAll();
      console.log('here 2');

      res.status(HttpStatus.OK).json(savedStories);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
