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

            toUpdateCompany.setRs(companyDto['rs']);
            toUpdateCompany.setAddress(companyDto['address']);
            toUpdateCompany.setImpositiveCategory(companyDto['impositiveCategory']);
            toUpdateCompany.setCuit(companyDto['cuit']);
            toUpdateCompany.setLogo(companyDto['logo']);
        
            await this.companyRepository.save(toUpdateCompany);
            return true;

        } catch {
            return false;
        }
    }
}
