
import { NivelCambio } from './nivelCambio.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private number: number;

    @Column()
    private name: string;

    @OneToOne(type => NivelCambio, nivelCambio => nivelCambio.getID, { nullable: true })
    @JoinColumn()
    private nivelCambio: NivelCambio;

    @Column()
    private plane: string;

    @Column({ nullable: true })
    private description?: string;

    @ManyToOne(type => Company, company => company.getID)
    private company: Company;


    public constructor(name: string, description: string/* , nivelCambio: NivelCambio */) {
        this.name = name;
        this.description = description;
        // this.nivelCambio = nivelCambio;
    }

    public getID(): number {
        return this.id;
    }

    public getNumber(): number {
        return this.number;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getNivelCambio(): NivelCambio {
        return this.nivelCambio;
    }

    public getPlane(): string {
        return this.plane;
    }

    public setPlane(path: string): void {
        this.plane = path;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getCompany(): Company {
        return this.company;
    }
}

