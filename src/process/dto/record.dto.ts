import { Oc } from "../../order/entities/oc.entity";
import { Of } from "../../order/entities/of.entity";
import { Process } from "../entities/process.entity";
import { Task } from "../entities/task.entity";

export class RecordDTO{
    readonly id:number;
    readonly oc?: Oc[];
    readonly of?: Of[];
    readonly process?: Process[];
    readonly taks?: Task[];
}