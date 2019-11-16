import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StandardTask } from "./standardTask.entity";

@Entity()
export class StandardProcess {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column()
    private requiredTime: Date;

    @OneToMany(type => StandardTask, stdTask => stdTask.getId)
    private standardTasks: StandardTask[];

    public constructor(name: string, description: string, requiredTime: Date, standardTasks: StandardTask[]) {
        this.name = name;
        this.description = description;
        this.requiredTime = requiredTime;
        this.standardTasks = standardTasks;
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

    public getRequiredTime(): Date {
        return this.requiredTime;
    }

    public setRequiredTime(value: Date): void {
        this.requiredTime = value;
    }

    public getStandardTasks(): StandardTask[] {
        return this.standardTasks;
    }

    public setStandardTasks(standardTasks: StandardTask[]): void {
        this.standardTasks = standardTasks;
    }
}