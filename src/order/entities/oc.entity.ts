import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity'
import { Company } from "../../company/entities/company.entity";
import { Of } from "./of.entity";

@Entity()
export class Oc {
    @PrimaryGeneratedColumn()
    private id: number;

    @UpdateDateColumn()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column()
    private quantity: number;

    @Column()
    private status: number;

    @OneToOne(type => Article)
    @JoinColumn()
    private article: Article;

    @OneToOne(type => User)
    @JoinColumn()
    private client: User;

    @ManyToOne(type => Company, company => company.getID, {
        cascade: true
    })
    private company: Company;

    @ManyToOne(type => Of, of => of.getID, {
        cascade: true
    })
    private oF: Of;

   
   /*  
    public constructor(article: Article, deliveryDate: Date, quantity: number, state: number, client: User) {
        this.article = article; */

    public constructor(deliveryDate: Date, quantity: number, status: number, client: User) {
        this.deliveryDate = deliveryDate;
        this.quantity = quantity;
        this.status = status;
        this.client = client;
    }

    public getID(): number {
        return this.id;
    }
/* 
    public getArticle(): Article {
        return this.article;
    }
 */
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

    public getState(): number {
        return this.status;
    }

    public setState(value: number): void {
        this.status = value;
    }

    public getClient(): User {
        return this.client;
    }
}