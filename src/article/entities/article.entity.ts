
import { NivelCambio } from './nivelCambio.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column()
    private nivelCambio: NivelCambio;

    @OneToOne(type => NivelCambio)
    @JoinColumn()
    nvCambio_id: NivelCambio;

    public constructor(name: string, description: string, nivelCambio: NivelCambio) {
        this.name = name;
        this.description = description;
        this.nivelCambio = nivelCambio;
    }

    public getID(): number {
        return this.id;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getName(): string {
        return this.name;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getDescription(): string {
        return this.description;
    }

    public getNivelCambio(): NivelCambio {
        return this.nivelCambio;
    }
}

