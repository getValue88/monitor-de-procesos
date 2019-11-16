import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Company } from "../../company/entities/company.entity";

@Entity()
export class manufactureOrder {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column()
    private endDate: Date;

    @OneToOne(type => User)
    @JoinColumn()
    private admin: User;

    @ManyToOne(type => Company, company => company.getID, {
        cascade: true
    })
    private company: Company;

    public constructor(initialDate: Date, deliveryDate: Date, endDate: Date, admin: User, company: Company) {
        this.initialDate = initialDate;
        this.deliveryDate = deliveryDate;
        this.endDate = endDate;
        this.admin = admin;
        this.company = company;
    }

    public getID(): number {
        return this.id;
    }

    public getInitialDate(): Date {
        return this.initialDate;
    }

    public getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    public setDeliveryDate(value: Date): void {
        this.deliveryDate = value;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(value: Date): void {
        this.endDate = value;
    }

    public getAdmin(): User {
        return this.admin;
    }

}