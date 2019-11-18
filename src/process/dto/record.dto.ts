import { PurchaseOrder } from "../../order/entities/purchaseOrder.entity";
import { ManufactureOrder } from "../../order/entities/manufactureOrder.entity";
import { ConcreteProcess } from "../entities/concreteProcess.entity";
import { ConcreteTask } from "../entities/concreteTask.entity";

export class RecordDTO{
    readonly id:number;
    readonly purchaseOrders?: number[];
    readonly manufactureOrders?: number[];
    readonly process?: number[];
    readonly concreteTasks?: number[];
}