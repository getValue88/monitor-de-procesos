import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity';
import { Company } from "src/company/entities/company.entity";
import { manufactureOrder } from "../entities/manufactureOrder.entity";

export class purchaseOrderDTO {
    readonly id: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly article: Article;
    readonly quantity: number;
    readonly status: number;
    readonly client: User;
    readonly company: Company;
    readonly manufactureOrder?: manufactureOrder;
}