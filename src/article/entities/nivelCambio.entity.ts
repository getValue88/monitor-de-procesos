import { Process } from '../../process/entities/process.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class NivelCambio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    private date: Date;

/* 
    private process: Process;
 */
    @Column()
    private plano: string;

    @Column()
    private image?: string;

    @OneToOne(type => Process, process => process.id)
    @JoinColumn()
    process_id: Process;

    // public constructor(date: Date, process: Process, plano: string, image?: string) {

    public constructor(date: Date, plano: string, image?: string) {
        this.date = date;
        // this.process = process;
        this.plano = plano;
        this.image = image;
    }

    public getID(): number {
        return this.id;
    }

    public getDate(): Date {
        return this.date;
    }
/* 
    public getProcess(): Process {
        return this.process;
    }
 */
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