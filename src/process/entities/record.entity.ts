import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Oc } from "src/order/entities/oc.entity";
import { Of } from "src/order/entities/of.entity";
import { Process } from "./process.entity";
import { Task } from "./task.entity";

@Entity()
export class Record {
    private static instance: Record;


    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ nullable: true })
    private oc?: Oc[] = [];

    @Column({ nullable: true })
    private of?: Of[] = [];

    @Column({ nullable: true })
    private process?: Process[] = [];

    @Column({ nullable: true })
    private task?: Task[] = [];

    private constructor() {
    }

    public getInstance(): Record {
        if (!Record.instance) {
            Record.instance = new Record();
        }
        return Record.instance;
    }

    public getID(): number {
        return this.id;
    }

    public getOc(): Oc[] {
        return this.oc;
    }

    public addOc(oc: Oc): void {
        this.oc.push(oc);
    }

    public getOf(): Of[] {
        return this.of;
    }

    public addOf(_of: Of): void {
        this.of.push(_of);
    }

    public getProcess(): Process[] {
        return this.process;
    }

    public addProcess(process: Process): void {
        this.process.push(process);
    }

    public getTask(): Task[] {
        return this.task;
    }

    public addTask(task: Task): void {
        this.task.push(task);
    }

}