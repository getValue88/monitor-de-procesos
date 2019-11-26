import { StandardProcess } from '../../process/entities/standardProcess.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class NivelCambio {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private date: Date;

    @Column()
    private plan: string;

    @Column()
    private image?: string;

    @OneToOne(type => StandardProcess, process => process.getID)
    @JoinColumn()
    private process: StandardProcess;

    // public constructor(date: Date, process: Process, plano: string, image?: string) {

    public constructor(date: Date, plan: string, process: StandardProcess, image?: string) {
        this.date = date;
        this.process = process;
        this.plan = plan;
        this.image = image;
    }

    public getID(): number {
        return this.id;
    }

    public getDate(): Date {
        return this.date;
    }

    public getProcess(): StandardProcess {
        return this.process;
    }

    public setProcess(stdProcess: StandardProcess): void {
        this.process = stdProcess;
    }

    public getPlano(): string {
        return this.plan;
    }

    public setImage(src: string): void {
        this.image = src;
    }

    public getImage(): string {
        return this.image;
    }

    public getPlan(): string {
        return this.plan;
    }

    public setPlan(path: string): void {
        this.plan = path;
    }
}