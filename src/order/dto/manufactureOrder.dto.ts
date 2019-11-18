import { User } from '../../user/entities/user.entity';
import { PurchaseOrder } from '../entities/purchaseOrder.entity';
import { Company } from 'src/company/entities/company.entity';

export class ManufactureOrderDTO {
    readonly id: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly purchaseOrders: number[];
    readonly admin: number;
    readonly company: number;
}