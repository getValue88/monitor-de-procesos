import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Alarm } from "./alarm.entity";
import { StandardProcess } from "./standardProcess.entity";

@Entity()
export class StandardTask {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column()
    private requiredTime: number;

    @ManyToOne(type => StandardProcess, process => process.standardTasks)
    process: StandardProcess;

    public constructor(name: string, description: string, requiredTime: number, process: StandardProcess) {
        this.name = name;
        this.description = description;
        this.requiredTime = requiredTime;
        this.process = process;
    }

    public getProcess(): StandardProcess {
        return this.process;
    }

    public setProcess(process: StandardProcess): void {
        this.process = process;
    }

    public getRequiredTime(): number {
        return this.requiredTime;
    }

    public setRequiredTime(requiredTime: number): void {
        this.requiredTime = requiredTime;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}