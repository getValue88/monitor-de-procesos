import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { PurchaseOrderDTO } from './dto/purchaseOrder.dto';

@Controller('order')
export class OrderController {
    public constructor(private readonly orderService: OrderService){}

    @Post('purchase')
    createPurchaseOrder(@Body() purchaseOrderDto: PurchaseOrderDTO){
        return this.orderService.createPurchaseOrder(purchaseOrderDto);
    }

}
