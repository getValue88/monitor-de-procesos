import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { ProcessService } from './process.service';
import { StandardTaskDTO } from './dto/standardTask.dto'
import { StandardProcessDTO } from './dto/standardProcess.dto';

@Controller('process')
export class ProcessController {
    public constructor(private readonly processService: ProcessService) { }

    @Post('stdTask')
    createStdTask(@Body() stdTaskDto: StandardTaskDTO[]) {
        return this.processService.createStdTask(stdTaskDto);
    }

    @Get('stdPrcs/:id')
    getProcessById(@Param('id') processId: number) {
        return this.processService.getProcessById(processId);
    }

    @Put('stdPrcs/:id')
    updateProcess(@Param('id') id: number, @Body() standardProcessDto: StandardProcessDTO) {
        return this.processService.updateStdProcess(id, standardProcessDto);
    }

    @Put('concreteTask/:id')
    updateConcreteTaskStatus(@Param('id') id: number, @Body() status: number) {
        return this.processService.updateConcreteTaskStatus(id, status);
    }

    @Get('concreteTask/:concreteProcessId')
    getConcreteTasksByConcreteProcessId(@Param('concreteProcessId') concreteProcessId: number) {
        return this.processService.getConcreteTasksByConcreteProcessId(concreteProcessId);
    }

    @Get('concreteProcess/manufacture/:manufactureId')
    getConcreteProcessByManufactureId(@Param('manufactureId') manufactureId: number) {
        return this.processService.getConcreteProcessByManufactureId(manufactureId);
    }

    @Get('concreteProcess/company/:companyId')
    getConcreteProcessByCompanyId(@Param('companyId') companyId: number) {
        return this.processService.getConcreteProcessByCompanyId(companyId);
    }

    @Get('concreteProcess/:id/header')
    getHeaderData(@Param('id') id: number) {
        return this.processService.getHeaderData(id);
    }
}
