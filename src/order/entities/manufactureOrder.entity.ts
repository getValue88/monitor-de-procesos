import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Company } from "../../company/entities/company.entity";
import { PurchaseOrder } from "./purchaseOrder.entity";

@Entity()
export class ManufactureOrder {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column({ nullable: true })
    private endDate: Date;

    @OneToOne(type => PurchaseOrder)
    @JoinColumn()
    private purchaseOrder: PurchaseOrder;

    @OneToOne(type => User)
    @JoinColumn()
    private supervisor: User;

    @ManyToOne(type => Company, company => company, {
        cascade: true
    })
    private company: Company;

    public constructor(initialDate: Date, deliveryDate: Date, purchaseOrder: PurchaseOrder, supervisor: User, company: Company) {
        this.initialDate = initialDate;
        this.deliveryDate = deliveryDate;
        this.endDate = null;
        this.purchaseOrder = purchaseOrder;
        this.supervisor = supervisor;
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

    public getSupervisor(): User {
        return this.supervisor;
    }
}