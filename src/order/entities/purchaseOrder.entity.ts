import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity'
import { Company } from "../../company/entities/company.entity";
import { ManufactureOrder } from "./manufactureOrder.entity";

@Entity()
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    private id: number;

    @UpdateDateColumn()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @ManyToOne(type => Article, article => article)
    @JoinColumn()
    private article: Article;
    
    @Column()
    private quantity: number;

    @Column()
    private status: number;

    @ManyToOne(type => User, user => user)
    private client: User;

    @ManyToOne(type => Company, company => company, {
        cascade: true
    })
    private company: Company;

    public constructor(deliveryDate: Date, quantity: number, article: Article, client: User, company: Company) {
        this.initialDate = new Date();
        this.deliveryDate = deliveryDate;
        this.quantity = quantity;
        this.status = 0;
        this.article = article;
        this.client = client;
        this.company = company;
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
}