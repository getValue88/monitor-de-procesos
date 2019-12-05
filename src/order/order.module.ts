import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchaseOrder.entity';
import { Company } from '../company/entities/company.entity';
import { Article } from '../article/entities/article.entity';
import { User } from '../user/entities/user.entity';
import { ManufactureOrder } from './entities/manufactureOrder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      ManufactureOrder,
      User,
      Company,
      Article
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
