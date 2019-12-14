import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { PurchaseOrderDTO } from './dto/purchaseOrder.dto';
import { ManufactureOrderDTO } from './dto/manufactureOrder.dto';

@Controller('order')
export class OrderController {
    public constructor(private readonly orderService: OrderService) { }

    @Post('purchase')
    createPurchaseOrder(@Body() purchaseOrderDto: PurchaseOrderDTO) {
        return this.orderService.createPurchaseOrder(purchaseOrderDto);
    }

    @Get('purchase/:id')
    getPurchaseOrderById(@Param('id') id: number) {
        return this.orderService.getPurchaseOrderById(id);
    }

    @Get('purchase/company/:companyId')
    getPurchaseOrdersByCompanyId(@Param('companyId') companyId: number) {
        return this.orderService.getPurchaseOrdersByCompanyId(companyId);
    }

    @Get('purchase/client/:clientId')
    getPurchaseOrdersByUserId(@Param('clientId') userId: number) {
        return this.orderService.getPurchaseOrdersByClientId(userId);
    }

    @Post('manufacture')
    createManufactureOrder(@Body() manufactureOrderDto: ManufactureOrderDTO) {
        return this.orderService.createManufactureOrder(manufactureOrderDto);
    }

    @Get('manufacture/company/:companyId')
    getManufactureOrderByCompanyId(@Param('companyId') companyId: number) {
        return this.orderService.getManufactureOrderByCompanyId(companyId);
    }

    @Get('manufacture/supervisor/:supervisorId')
    getManufactureOrderBySupervisorId(@Param('supervisorId') supervisorId: number) {
        return this.orderService.getManufactureOrderBySupervisorId(supervisorId);
    }
}
