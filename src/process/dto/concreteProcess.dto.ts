import { User } from "src/user/entities/user.entity";
import { Alarm } from "../entities/alarm.entity";
import { StandardProcess } from "../entities/standardProcess.entity";

export class ConcreteProcessDTO {
    readonly id: number;
    readonly standardProcess: StandardProcess;
    readonly status: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly responsible: User;
    readonly alarm?: Alarm;
}