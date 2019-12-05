import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { StandardTask } from "./standardTask.entity";
import { Alarm } from "./alarm.entity";
import { ConcreteProcess } from "./concreteProcess.entity";

@Entity()
export class ConcreteTask {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column()
    private endDate: Date;

    @Column()
    private status: number;

    @OneToOne(type => StandardTask)
    @JoinColumn()
    private standardTask: StandardTask;

    @OneToMany(type => ConcreteTask, tasks => tasks.previousTask)
    private previousTask: ConcreteTask[] = [];

    @OneToOne(type => Alarm)
    @JoinColumn()
    private alarm: Alarm;
    
        @ManyToOne(type => ConcreteProcess, process => process)
        private concreteProcess: ConcreteProcess;
    
    public constructor(initialDate: Date, deliveryDate: Date, endDate: Date, status: number, standardTask: StandardTask, concreteProcess: ConcreteProcess, previousTask?: ConcreteTask[]) {
        this.initialDate = initialDate;
        this.deliveryDate = deliveryDate;
        this.endDate = endDate;
        this.status = status;
        this.standardTask = standardTask;
        this.concreteProcess = concreteProcess;
        this.previousTask = previousTask;
    }

    public getID(): number {
        return this.id;
    }

    public getInitialDate(): Date {
        return this.initialDate;
    }

    public setInitialDate(initialDate: Date): void {
        this.initialDate = initialDate;
    }

    public getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    public setDeliveryDate(deliveryDate: Date): void {
        this.deliveryDate = deliveryDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number): void {
        this.status = status;
    }

    public getStandardTask(): StandardTask {
        return this.standardTask;
    }

    public setStandardTask(standardTask: StandardTask): void {
        this.standardTask = standardTask;
    }

    public getPreviousTask(): ConcreteTask[] {
        return this.previousTask;
    }

    public setPreviousTask(previousTask: ConcreteTask[]): void {
        this.previousTask = previousTask;
    }

    public getAlarm(): Alarm {
        return this.alarm;
    }

    public setAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }
    /* 
        public getConcreteProcess(): ConcreteProcess {
            return this.concreteProcess;
        }
    
        public setConcreteProcess(concreteProcess: ConcreteProcess): void {
            this.concreteProcess = concreteProcess;
        } */
}