import { Task } from "../entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Alarm } from "../entities/alarm.entity";

export class ProcessDTO{
    readonly id:number;
    readonly name:string;
    readonly description:string;
    readonly tasks: Task[];
    readonly state: number;
    readonly startDate: Date;
    readonly deliveryDate: Date;
    readonly responsible: User;
    readonly alarm?: Alarm;
}