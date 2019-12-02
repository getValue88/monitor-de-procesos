import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { PurchaseOrderDTO } from './dto/purchaseOrder.dto';

@Controller('order')
export class OrderController {
    public constructor(private readonly orderService: OrderService) { }

    @Post('purchase')
    createPurchaseOrder(@Body() purchaseOrderDto: PurchaseOrderDTO) {
        return this.orderService.createPurchaseOrder(purchaseOrderDto);
    }

    @Get('purchase/company/:companyId')
    getPurchaseOrdersByCompanyId(@Param('companyId') companyId: number) {
        return this.orderService.getPurchaseOrdersByCompanyId(companyId);
    }

    @Get('purchase/client/:userId')
    getPurchaseOrdersByUserId(@Param('userId') userId: number){
        return this.orderService.getPurchaseOrdersByUserId(userId);
    }
}
