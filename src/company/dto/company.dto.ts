import { Entity } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { purchaseOrder } from "../../order/entities/purchaseOrder.entity";
import { manufactureOrder } from "../../order/entities/manufactureOrder.entity";
import { Record } from "../../process/entities/record.entity";

@Entity()
export class CompanyDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly articles: Article[];
    readonly purchaseOrders: purchaseOrder[];
    readonly manufactureOrders: manufactureOrder[];
    readonly record: Record;
    readonly logo?: string;
}