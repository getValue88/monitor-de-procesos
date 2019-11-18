import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NivelCambio } from './entities/nivelCambio.entity';
import { ArticleDTO } from './dto/article.dto';

@Injectable()
export class ArticleService {

    public constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(NivelCambio) private readonly nivelCambioRepository: Repository<NivelCambio>) { }

    public async getByCompany(companyId): Promise<Article[]> {
        return await this.articleRepository.createQueryBuilder('article')
            .innerJoinAndSelect('article.nivelCambio', 'nivelCambio')
            .innerJoinAndSelect('nivelCambio.process', 'standardProcess')
            .innerJoinAndSelect('standardProcess.standardTasks', 'standardTasks')
            .where({ 'company': companyId }).getMany();
    }
/* 
    public async createArticle(articleDto: ArticleDTO): Promise<Boolean> {
        try {
            let newArticle = new Article(
                articleDto['name'],
                articleDto['number'],
                articleDto['description'],
                articleDto['nivelCambio'],
                articleDto['company']
            );
            await this.articleRepository.save(newArticle);
            return true;
        }
        catch {
            return false;
        }
    }
 */
    public async createNivelCambio(nivelCambioDto): Promise<Boolean> {
        try {
            let newNivelCambio = new NivelCambio(
                nivelCambioDto['date'],
                nivelCambioDto['plan'],
                nivelCambioDto['process'],
                nivelCambioDto['image']
            );
            this.nivelCambioRepository.save(newNivelCambio);
            return true;
        }
        catch {
            return false;
        }
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
