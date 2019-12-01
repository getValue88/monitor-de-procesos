import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NivelCambio } from './entities/nivelCambio.entity';
import { ArticleDTO } from './dto/article.dto';
import { Company } from '../company/entities/company.entity';
import { NivelCambioDTO } from './dto/nivelCambio.dto';


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

    public async getNivelCambio(ncID: number): Promise<NivelCambio> {
        try {
            // console.log(await this.nivelCambioRepository.findOne({ relations: ['process'], where: { id: ncID } }));
            return await this.nivelCambioRepository.createQueryBuilder('nc')
                .select(['nc', 'process.id'])
                .where('nc.id =:id', { id: ncID })
                .innerJoin('nc.process', 'process')
                .getOne();
        }
        catch {
            return null;
        }
    }

    public async setNivelCambio(ncID: any, nivelCambioDto: NivelCambioDTO): Promise<Boolean> {
        try {
            let toUpdateNC = await this.nivelCambioRepository.findOne(ncID);
            
            toUpdateNC['date'] = nivelCambioDto['date'];
            toUpdateNC['plan'] = nivelCambioDto['plan'];
            toUpdateNC['image'] = nivelCambioDto['image'];
            await this.nivelCambioRepository.save(toUpdateNC);
            return true;
        }
        catch {
            return false;
        }
    }
}
