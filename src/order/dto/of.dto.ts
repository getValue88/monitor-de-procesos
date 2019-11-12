import { User } from '../../user/entities/user.entity';
import { Oc } from '../entities/oc.entity';

export class OfDTO{
    readonly id:number;
    readonly admin: User;
    readonly initialDate: Date;
    readonly endDate: Date;
    readonly items: Oc[];
}