import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { ProcessService } from './process.service';
import { StandardTaskDTO } from './dto/standardTask.dto'
import { StandardProcessDTO } from './dto/standardProcess.dto';

@Controller('process')
export class ProcessController {
    public constructor(private readonly processService: ProcessService) { }

    @Post('stdPrcs')
    createStandardProcess(@Body() standardProcess: StandardProcessDTO) {
        return this.processService.createStandardProcess(standardProcess);
    }

    @Post('stdTask')
    createStdTask(@Body() stdTaskDto: StandardTaskDTO[]) {
        return this.processService.createStdTask(stdTaskDto);
    }

    @Get('stdPrcs/:id')
    getProcessById(@Param('id') processId: number) {
        return this.processService.getProcessById(processId);
    }
/* 
    @Put('stdPrcs/:id')
    updateProcess(@Param('id') id, standardProcessDto: StandardProcessDTO) {
        return this.processService.updateStdProcess(id, standardProcessDto);
    } */
}
