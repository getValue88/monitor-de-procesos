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

    @Column({ nullable: true })
    public requiredTime: number;

    @OneToMany(type => StandardTask, stdTask => stdTask.process)
    standardTasks: StandardTask[];

    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.requiredTime = null;
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

    public getRequiredTime(): number {
        return this.requiredTime;
    }

    public setRequiredTime(value: number): void {
        this.requiredTime = value;
    }

    public getStandardTasks(): StandardTask[] {
        return this.standardTasks;
    }

    public setStandardTasks(standardTasks: StandardTask[]): void {
        this.standardTasks = standardTasks;
    }
}