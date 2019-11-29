import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { NivelCambioDTO } from './dto/nivelCambio.dto';
import { ArticleDTO } from './dto/article.dto';

@Controller('article')
export class ArticleController {

    public constructor(private readonly articleService: ArticleService) { }

    @Get('company/:companyId')
    getByCompany(@Param('companyId') companyId: number) {
        return this.articleService.getByCompany(companyId);
    }

    @Post()
    createArticle(@Body() articleDto: ArticleDTO) {
        return this.articleService.createArticle(articleDto);
    }

    /* 
        @Get()
        getAll() {
            return this.articleService.getAll();
        }
    */

    /* 
        @Post()
        create(@Body() articleDto: ArticleDTO) {
            return this.articleService.create(articleDto);
        }
     */
}
