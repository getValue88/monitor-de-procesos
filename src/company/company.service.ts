import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    public constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>) { }

    public async updateCompany(companyId, companyDto): Promise<Boolean> {
        try {
            let toUpdateCompany = await this.companyRepository.findOne(companyId);

            toUpdateCompany['rs'] = companyDto['rs'];
            toUpdateCompany['address'] = companyDto['address'];
            toUpdateCompany['impositiveCategory'] = companyDto['impositiveCategory'];
            toUpdateCompany['cuit'] = companyDto['cuit'];
            toUpdateCompany['logo'] = companyDto['logo'];
        
            await this.companyRepository.save(toUpdateCompany);
            return true;

        } catch {
            return false;
        }
    }
}
