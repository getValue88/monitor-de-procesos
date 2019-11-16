import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NivelCambio } from './entities/nivelCambio.entity';

@Injectable()
export class ArticleService {

    public constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(NivelCambio) private readonly nivelCambioRepository: Repository<NivelCambio>) { }

    public async getByCompany(companyId): Promise<Article[]> {
        return await this.articleRepository.find({ where: { 'company': companyId } });
    }

    /* 
        public async getAll(): Promise<Article[]> {
            try {
                return await this.articleRepository.find();
            }
            catch{
                return null;
            }
        }
     */

    /* 
        public async getById(id: number): Promise<Article> {
            return await this.articleRepository.findOne(id);
        }
     */

    /* 
        public async create(articleDto: ArticleDTO): Promise<Article[]> {
            try {
                let newArticle = new Article(articleDto.name, articleDto.description, articleDto.nivelCambio );
                await this.articleRepository.save(newArticle);
                return await this.getAll();
            }
            catch{
                return null;
            }
        }
    */

    /* 
        public async getNivelesCambio(): Promise<NivelCambio[]> {
            return await this.nivelCambioRepository.find();
        }
    */


}
