import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { StandardProcess } from './entities/standardProcess.entity';
import { ConcreteProcess } from './entities/concreteProcess.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StandardTask,
      StandardProcess,
      ConcreteProcess
    ])
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService]
})
export class ProcessModule { }
