import { Entity } from "typeorm";
import { Article } from "src/article/entities/article.entity";
import { Oc } from "src/order/entities/oc.entity";
import { Of } from "src/order/entities/of.entity";
import { Record } from "src/process/entities/record.entity";

@Entity()
export class CompanyDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly logo?: string;
    readonly articles: Article[];
    readonly oc: Oc[];
    readonly of: Of[];
    readonly record: Record;
}