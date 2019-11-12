import { Process } from '../../process/entities/process.entity';
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class NivelCambio {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private date: Date;

    @Column()
    private process: Process;

    @Column()
    private plano: string;

    @Column()
    private image?: string;

    public constructor(id: number, date: Date, process: Process, plano: string, image?: string) {
        this.id = id;
        this.date = date;
        this.process = process;
        this.plano = plano;
        this.image = image;
    }

    public getID(): number {
        return this.id;
    }

    public getDate(): Date {
        return this.date;
    }

    public getProcess(): Process {
        return this.process;
    }

    public getPlano(): string {
        return this.plano;
    }

    public setImage(src: string): void {
        this.image = src;
    }

    public getImage(): string {
        return this.image;
    }
}