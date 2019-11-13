import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from '../../user/entities/user.entity';
// import { Oc } from "./oc.entity";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Of {
    @PrimaryGeneratedColumn()
    id: number;

    // private admin: User;

    @Column()
    private initialDate: Date;

    @Column()
    private endDate: Date;


    // private items: Oc[] = [];

    @OneToOne(type => User)
    @JoinColumn()
    admin: User;

    @ManyToOne(type => Company, company => company.id, {
        cascade: true
    })
    companyFK: Company;


    // public constructor(admin: User, initialDate: Date, endDate: Date, items: Oc[]) {
    public constructor(admin: User, initialDate: Date, endDate: Date) {
        this.admin = admin;
        this.initialDate = initialDate;
        this.endDate = endDate;
        // this.items = items;
    }

    public getID(): number {
        return this.id;
    }

    public getAdmin(): User {
        return this.admin;
    }

    public getInitialDate(): Date {
        return this.initialDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(value: Date): void {
        this.endDate = value;
    }

/*     public getItems(): Oc[] {
        return this.items;
    } */
}