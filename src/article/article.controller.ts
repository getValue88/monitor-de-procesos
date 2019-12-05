import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
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

    @Get('nc/:ncID')
    getNivelCambio(@Param('ncID') ncID: number) {
        return this.articleService.getNivelCambio(ncID);
    }

    @Put('nc/:ncID')
    setNivelCambio(@Param('ncID') ncID, @Body() nivelCambioDto: NivelCambioDTO) {
        return this.articleService.setNivelCambio(ncID, nivelCambioDto);
    }
}
