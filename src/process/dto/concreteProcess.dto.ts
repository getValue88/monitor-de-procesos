export class ConcreteProcessDTO {
    readonly id: number;
    readonly standardProcess: number;
    readonly status: number;
    readonly initialDate: Date;
    readonly deliveryDate: Date;
    readonly endDate: Date;
    readonly responsible: number;
    readonly alarm?: number;
}