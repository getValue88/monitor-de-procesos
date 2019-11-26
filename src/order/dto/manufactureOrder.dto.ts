export class ManufactureOrderDTO {
    readonly id: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly purchaseOrders: number[];
    readonly admin: number;
    readonly company: number;
}