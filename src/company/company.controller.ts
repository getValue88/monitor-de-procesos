import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';

@Controller('company')
export class CompanyController {
    public constructor(private readonly companyService: CompanyService) { }


    @Put(':companyId')
    public updateCompany(@Param('companyId') companyId, @Body() companyDto: CompanyDTO) {
        return this.companyService.updateCompany(companyId,companyDto);
    }

}
