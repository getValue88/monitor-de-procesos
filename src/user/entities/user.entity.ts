import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private password: string;

    @Column()
    private privilege: string;

    @Column({ nullable: true })
    private observations?: string;

    @ManyToOne(type => Company, company => company.getID, { nullable: true })
    private company: Company;

    public constructor(id: number, name: string, password: string, privilege: string, observations?: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.privilege = privilege;
        this.observations = observations;
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

    public getPassword(): string {
        return this.password;
    }

    public setPassword(value: string): void {
        this.password = value;
    }

    public getPrivilege(): string {
        return this.privilege;
    }

    public setPrivilege(value: string): void {
        this.privilege = value;
    }

    public getObservations(): string {
        return this.observations;
    }

    public setObservations(value: string): void {
        this.observations = value;
    }

    public getCompany(): Company {
        return this.company;
    }
}