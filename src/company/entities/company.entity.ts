import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Company {
    private static instance: Company;

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private rs: string;

    @Column()
    private address: string;

    @Column()
    private impositiveCategory: string;

    @Column()
    private cuit: string;

    @Column()
    private logo?: string;

    private constructor() {
    }

    public getID(): number {
        return this.id;
    }

    public getRs(): string {
        return this.rs;
    }

    public setRs(value: string): void {
        this.rs = value;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(value: string): void {
        this.address = value;
    }

    public getImpositiveCategory(): string {
        return this.impositiveCategory;
    }

    public setImpositiveCategory(value: string): void {
        this.impositiveCategory = value;
    }

    public getCuit(): string {
        return this.cuit;
    }

    public setCuit(value: string): void {
        this.cuit = value;
    }

    public getLogo(): string {
        return this.logo;
    }

    public setLogo(path: string): void {
        this.logo = path;
    }
}