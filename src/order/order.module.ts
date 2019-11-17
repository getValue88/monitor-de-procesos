import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchaseOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
