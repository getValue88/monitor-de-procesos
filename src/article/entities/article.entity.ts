
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

    @OneToOne(type => NivelCambio, nivelCambio => nivelCambio)
    @JoinColumn()
    private nivelCambio: NivelCambio;

    @Column({ nullable: true })
    private description?: string;

    @ManyToOne(type => Company, company => company)
    private company: Company;


    public constructor(name: string, number: number, description: string, nivelCambio: NivelCambio, company: Company) {
        this.name = name;
        this.number = number;
        this.description = description;
        this.nivelCambio = nivelCambio;
        this.company = company;
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

