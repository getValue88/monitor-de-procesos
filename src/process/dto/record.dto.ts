import { purchaseOrder } from "../../order/entities/purchaseOrder.entity";
import { manufactureOrder } from "../../order/entities/manufactureOrder.entity";
import { ConcreteProcess } from "../entities/concreteProcess.entity";
import { ConcreteTask } from "../entities/concreteTask.entity";

export class RecordDTO{
    readonly id:number;
    readonly purchaseOrders?: purchaseOrder[];
    readonly manufactureOrders?: manufactureOrder[];
    readonly process?: ConcreteProcess[];
    readonly concreteTasks?: ConcreteTask[];
}