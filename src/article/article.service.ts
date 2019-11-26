import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NivelCambio } from './entities/nivelCambio.entity';
import { ArticleDTO } from './dto/article.dto';
import { StandardProcess } from '../process/entities/standardProcess.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class ArticleService {

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(NivelCambio) private readonly nivelCambioRepository: Repository<NivelCambio>,
        @InjectRepository(StandardProcess) private readonly standardProcessRepository: Repository<StandardProcess>,
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>
    ) { }

    public async getByCompany(companyId): Promise<Article[]> {
        return await this.articleRepository.createQueryBuilder('article')
            .innerJoinAndSelect('article.nivelCambio', 'nivelCambio')
            /*             .innerJoinAndSelect('nivelCambio.process', 'standardProcess')
                        .innerJoinAndSelect('standardProcess.standardTasks', 'standardTasks') */
            .where({ 'company': companyId }).getMany();
    }

    public async createArticle(articleDto: ArticleDTO): Promise<Article[]> {
        try {
            let nvCambio = await this.nivelCambioRepository.findOne({ where: { id: articleDto['nivelCambio'] } });
            let comp = await this.companyRepository.findOne({ where: { id: articleDto['company'] } })
            let newArticle = new Article(
                articleDto['name'],
                articleDto['number'],
                articleDto['description'],
                nvCambio,
                comp
            );
            await this.articleRepository.save(newArticle);
            return this.getByCompany(articleDto['company']);
        }
        catch {
            return null;
        }
    }

    public async createNivelCambio(nivelCambioDto): Promise<any> {
        try {
            let stdProcess = await this.standardProcessRepository.findOne({ where: { id: nivelCambioDto['standardProcess'] } })
            let newNivelCambio = new NivelCambio(
                nivelCambioDto['date'],
                nivelCambioDto['plan'],
                stdProcess,
                nivelCambioDto['image']
            );
            await this.nivelCambioRepository.save(newNivelCambio);
            return await this.nivelCambioRepository.createQueryBuilder('nc')
                .select(['nc.id'])
                .where({
                    'date': nivelCambioDto['date'],
                    'plan': nivelCambioDto['plan'],
                    'image': nivelCambioDto['image'],
                    'standardProcess': nivelCambioDto['standardProcess']
                }).getOne();
        }
        catch {
            return null;
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
