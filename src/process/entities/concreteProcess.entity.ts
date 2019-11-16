import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Alarm } from "./alarm.entity";
import { StandardProcess } from "./standardProcess.entity";

@Entity()
export class ConcreteProcess {
    @PrimaryGeneratedColumn()
    private id: number;

    @OneToOne(type => StandardProcess)
    @JoinColumn()
    private standardProcess: StandardProcess;

    @Column()
    private status: number;

    @Column()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column()
    private endDate: Date;

    @OneToOne(type => User, user => user.getID)
    @JoinColumn()
    responsible: User;

    @JoinColumn()
    @OneToOne(type => Alarm, alarm => alarm.getID)
    alarm: Alarm;

    public constructor(standardProcess: StandardProcess, status: number, initialDate: Date, deliveryDate: Date, responsible: User, alarm: Alarm) {
        this.standardProcess = standardProcess;
        this.status = status;
        this.initialDate = initialDate;
        this.deliveryDate = deliveryDate;
        this.responsible = responsible;
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
        if (value >= 0 && value <= 100)
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

    public getResponsible(): User {
        return this.responsible;
    }

    public setResponsible(user: User) {
        this.responsible = user;
    }

    public getAlarm(): Alarm {
        return this.alarm;
    }

    public setAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }
}