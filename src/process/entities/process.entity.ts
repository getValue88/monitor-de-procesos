import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Alarm } from "./alarm.entity";
import { Record } from "./record.entity";

@Entity()
export class Process {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    // private tasks: Task[] = [];

    @Column()
    private state: number;

    @Column()
    private startDate: Date;

    @Column()
    private deliveryDate: Date;

    // private responsible: User;

    // private alarm?: Alarm;


    @OneToOne(type => User, user => user.getID)
    @JoinColumn()
    responsible: User;

    @JoinColumn()
    @OneToOne(type => Alarm, alarm => alarm.getID)
    alarm: Alarm;


    // public constructor(name: string, description: string, tasks: Task[], state: number, startDate: Date, deliveryDate: Date, responsible: User, alarm?: Alarm) {
    @ManyToOne(type => Record, record => record.getID)
    record: Record;

    public constructor(name: string, description: string, state: number, startDate: Date, deliveryDate: Date) {
        this.name = name;
        this.description = description;
        // this.tasks = tasks;
        this.state = state;
        this.startDate = startDate;
        this.deliveryDate = deliveryDate;
        // this.responsible = responsible;
        // this.alarm = alarm;
    }

    public getID(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }
/* 
    public getTasks(): Task[] {
        return this.tasks;
    }

    public setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }
 */
    public getState(): number {
        return this.state;
    }

    public setState(value: number): void {
        if (value >= 0 && value <= 100)
            this.state = value;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(value: Date): void {
        this.startDate = value;
    }

    public getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    public setDeliveryDate(value: Date): void {
        this.deliveryDate = value;
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