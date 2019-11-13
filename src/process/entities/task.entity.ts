import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Alarm } from "./alarm.entity";
import { Process } from "./process.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    private description: string;

    @Column()
    private estimatedTime: number;

    @Column()
    private startTime: Date;

    @Column()
    private endTime: Date;

    @Column()
    private state: number;

    private previousTask: Task[]= [];

    @ManyToOne(type => Task, tasks => tasks.previousTask, {
        cascade: true
    })
    prevTask: Task[];

    @ManyToOne(type => Process, process => process.id)
    process: Process;

    @OneToOne(type => Alarm, alarm => alarm.id)
    @JoinColumn()
    alarm: Alarm;

    public constructor(id: number, description: string, estimatedTime: number, startTime: Date, endTime: Date, previousTask: Task[], alarm: Alarm) {
        this.id = id;
        this.description = description;
        this.estimatedTime = estimatedTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.state = 0;
        this.previousTask = previousTask;
        this.alarm = alarm;
    }

    public getID(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getEstimatedTime(): number {
        return this.estimatedTime;
    }

    public setEstimatedTime(minutes: number): void {
        this.estimatedTime = minutes;
    }

    public getStartTime(): Date {
        return this.startTime;
    }

    public setStartTime(value: Date) {
        this.startTime = value;
    }

    public getEndTime(): Date {
        return this.endTime;
    }

    public setEndTime(value: Date): void {
        this.endTime = value;
    }

    public getState(): number {
        return this.state;
    }

    public setState(percentage: number): void {
        if (percentage >= 0 && percentage <= 100)
            this.state = percentage;
    }

    public getPreviousTask(): Task[] {
        return this.previousTask;
    }

    public setPreviousTask(tasks: Task[]): void {
        this.previousTask = tasks;
    }

    public getAlarm(): Alarm {
        return this.alarm;
    }

    public setAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }
}