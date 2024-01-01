import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './models/News.model';

const MONGO_URI = process.env.MONGO_URI || ''; // provide mongo connection string.

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(MONGO_URI),
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class AppModule {}
