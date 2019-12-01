import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NivelCambio } from './entities/nivelCambio.entity';
import { ArticleDTO } from './dto/article.dto';
import { Company } from '../company/entities/company.entity';


@Injectable()
export class ArticleService {

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(NivelCambio) private readonly nivelCambioRepository: Repository<NivelCambio>,
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>
    ) { }

    public async getByCompany(companyId): Promise<Article[]> {
        return await this.articleRepository.createQueryBuilder('article')
            .innerJoinAndSelect('article.nivelCambio', 'nivelCambio')
            /*             .innerJoinAndSelect('nivelCambio.process', 'standardProcess')
                        .innerJoinAndSelect('standardProcess.standardTasks', 'standardTasks') */
            .where({ 'company': companyId }).getMany();
    }

    public async createArticle(articleDto: ArticleDTO): Promise<any> {
        try {
            let comp = await this.companyRepository.findOne({ where: { id: articleDto['company'] } })
            let newArticle = new Article(
                articleDto['name'],
                articleDto['number'],
                articleDto['description'],
                null,
                comp
            );
            await this.articleRepository.save(newArticle);
            return await this.nivelCambioRepository.createQueryBuilder().select("max(id)", "ncID").getRawOne();            
        }
        catch {
            return null;
        }
    }
}
