import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { StandardProcess } from './entities/standardProcess.entity';
import { ConcreteProcess } from './entities/concreteProcess.entity';
import { ConcreteTask } from './entities/concreteTask.entity';
import { PurchaseOrder } from '../order/entities/purchaseOrder.entity';
import { ManufactureOrder } from '../order/entities/manufactureOrder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StandardTask,
      StandardProcess,
      ConcreteProcess,
      ConcreteTask,
      PurchaseOrder,
      ManufactureOrder
    ])
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService]
})
export class ProcessModule { }
