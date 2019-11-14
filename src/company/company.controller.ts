import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    public constructor(private readonly companyService: CompanyService) { }

}
