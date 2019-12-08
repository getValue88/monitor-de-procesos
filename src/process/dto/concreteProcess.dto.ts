export class ConcreteProcessDTO {
    readonly standardProcess: number;
    readonly status: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly supervisor: number;
    readonly alarm?: number;
}