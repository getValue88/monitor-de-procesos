import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity'
import { Company } from "../../company/entities/company.entity";
import { manufactureOrder } from "./manufactureOrder.entity";

@Entity()
export class purchaseOrder {
    @PrimaryGeneratedColumn()
    private id: number;

    @UpdateDateColumn()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @OneToOne(type => Article)
    @JoinColumn()
    private article: Article;
    
    @Column()
    private quantity: number;

    @Column()
    private status: number;

    @OneToOne(type => User)
    @JoinColumn()
    private client: User;

    @ManyToOne(type => Company, company => company.getID, {
        cascade: true
    })
    private company: Company;

    @ManyToOne(type => manufactureOrder, mf => mf.getID, {
        cascade: true, nullable: true
    })
    private manufactureOrder: manufactureOrder;

    public constructor(deliveryDate: Date, quantity: number, status: number, article: Article, client: User, company: Company, manufactureOrder: manufactureOrder) {
        this.deliveryDate = deliveryDate;
        this.quantity = quantity;
        this.status = status;
        this.article = article;
        this.client = client;
        this.company = company;
        this.manufactureOrder = manufactureOrder;
    }

    public getID(): number {
        return this.id;
    }

    public getArticle(): Article {
        return this.article;
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

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(value: number): void {
        this.quantity = value;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(value: number): void {
        this.status = value;
    }

    public getClient(): User {
        return this.client;
    }

    public getCompany(): Company {
        return this.company;
    }

    public getManufactureOrder(): manufactureOrder {
        return this.manufactureOrder;
    }

    public setManufactureOrder(manufactureOrder: manufactureOrder): void {
        this.manufactureOrder = manufactureOrder;
    }
}