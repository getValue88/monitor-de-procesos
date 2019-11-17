import { Controller, Post, Body } from '@nestjs/common';
import { ProcessService } from './process.service';
import { StandardTaskDTO } from './dto/standardTask.dto';

@Controller('process')
export class ProcessController {
    public constructor(private readonly processService: ProcessService){}

    @Post('stdTask')
    createStdTask(@Body() stdTaskDto: StandardTaskDTO){
        return this.processService.createStdTask(stdTaskDto);
    }
}
