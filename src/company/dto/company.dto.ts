import { Entity } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { Oc } from "../../order/entities/oc.entity";
import { Of } from "../../order/entities/of.entity";
import { Record } from "../../process/entities/record.entity";

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