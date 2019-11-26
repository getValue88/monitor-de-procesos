import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { StandardProcess } from './entities/standardProcess.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StandardTask,StandardProcess])],
  controllers: [ProcessController],
  providers: [ProcessService]
})
export class ProcessModule {}
