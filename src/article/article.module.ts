import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { NivelCambio } from './entities/nivelCambio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article,NivelCambio])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
