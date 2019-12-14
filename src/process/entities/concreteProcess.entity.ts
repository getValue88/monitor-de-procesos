import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Alarm } from "./alarm.entity";
import { StandardProcess } from "./standardProcess.entity";
import { ManufactureOrder } from "../../order/entities/manufactureOrder.entity";

@Entity()
export class ConcreteProcess {
    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToOne(type => StandardProcess, standardProcess => standardProcess)
    private standardProcess: StandardProcess;

    @Column()
    private status: number;

    @Column()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column({ nullable: true })
    private endDate: Date;

    @ManyToOne(type => User, supervisor => supervisor)
    private supervisor: User;

    @JoinColumn()
    @OneToOne(type => ManufactureOrder, manufactureOrder => manufactureOrder)
    private manufactureOrder: ManufactureOrder;

    @JoinColumn()
    @OneToOne(type => Alarm, alarm => alarm)
    alarm: Alarm;

    public constructor(standardProcess: StandardProcess, status: number, initialDate: Date, deliveryDate: Date, supervisor: User, manufactureOrder: ManufactureOrder, alarm: Alarm) {
        this.standardProcess = standardProcess;
        this.status = status;
        this.initialDate = initialDate;
        this.deliveryDate = deliveryDate;
        this.supervisor = supervisor;
        this.manufactureOrder = manufactureOrder;
        this.endDate = null;
        this.alarm = alarm;
    }

    public getID(): number {
        return this.id;
    }

    getStandardProcess(): StandardProcess {
        return this.standardProcess;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(value: number): void {
        if (value > 100)
            value = 100;
        if (value >= 0)
            this.status = value;
    }

    public getInitialDate(): Date {
        return this.initialDate;
    }

    public setInitialDate(value: Date): void {
        this.initialDate = value;
    }

    public getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    public setDeliveryDate(value: Date): void {
        this.deliveryDate = value;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(value: Date): void {
        this.endDate = value;
    }

    public getSupervisor(): User {
        return this.supervisor;
    }

    public setSupervisor(user: User) {
        this.supervisor = user;
    }

    public getAlarm(): Alarm {
        return this.alarm;
    }

    public setAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }

    public getManufactureOrder(): ManufactureOrder {
        return this.manufactureOrder;
    }

    public setManufactureOrder(manufactureOrder: ManufactureOrder): void {
        this.manufactureOrder = manufactureOrder;
    }
}