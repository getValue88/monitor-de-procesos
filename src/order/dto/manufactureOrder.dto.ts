import { User } from '../../user/entities/user.entity';
import { purchaseOrder } from '../entities/purchaseOrder.entity';
import { Company } from 'src/company/entities/company.entity';

export class manufactureOrderDTO {
    readonly id: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly purchaseOrders: purchaseOrder[];
    readonly admin: User;
    readonly company: Company;
}