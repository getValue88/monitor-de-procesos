import { StandardTask } from "../entities/standardTask.entity";
import { ConcreteTask } from "../entities/concreteTask.entity";
import { Alarm } from "../entities/alarm.entity";

export class ConcreteTaskDTO{
    readonly id:number;
    readonly initialDate: Date;
    readonly deliveryDate:Date;
    readonly endDate: Date;
    readonly status: number;
    readonly standardTask: number;
    readonly previousTask: number[];
    readonly alarm: number;
}