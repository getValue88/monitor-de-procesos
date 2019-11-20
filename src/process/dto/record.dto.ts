export class RecordDTO{
    readonly id:number;
    readonly purchaseOrders?: number[];
    readonly manufactureOrders?: number[];
    readonly process?: number[];
    readonly concreteTasks?: number[];
}