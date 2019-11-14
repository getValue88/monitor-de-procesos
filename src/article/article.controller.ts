import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article.dto';

@Controller('article')
export class ArticleController {

    public constructor(private readonly articleService: ArticleService) { }

    @Get('company/:companyId')
    getByCompany(@Param('companyId') companyId: number) {
        return this.articleService.getByCompany(companyId);
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
