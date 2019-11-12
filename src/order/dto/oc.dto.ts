import { Article } from "src/article/entities/article.entity";
import { User } from '../../user/entities/user.entity';

export class OcDTO{
    readonly id:number;
    readonly article: Article;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly quantity: number;
    readonly state: number;
    readonly client: User;
}