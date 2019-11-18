import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity';
import { Company } from "src/company/entities/company.entity";
import { ManufactureOrder } from "../entities/manufactureOrder.entity";

export class PurchaseOrderDTO {
    readonly deliveryDate: Date;
    readonly article: number;
    readonly quantity: number;
    readonly status: number;
    readonly client: number;
    readonly company: number;
    readonly manufactureOrder?: number;
}