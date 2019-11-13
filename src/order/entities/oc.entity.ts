import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Article } from "../../article/entities/article.entity";
import { User } from '../../user/entities/user.entity'
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Oc {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    private article: Article;

    @UpdateDateColumn()
    private initialDate: Date;

    @Column()
    private deliveryDate: Date;

    @Column()
    private quantity: number;

    @Column()
    private state: number;

    // @Column()
    private client: User;

    @OneToOne(type => Article)
    @JoinColumn()
    article_id: Article;

    @OneToOne(type => User)
    @JoinColumn()
    user_id: User;

    @OneToMany(type => Company, company => company.id, {
        cascade: true
    })
    @JoinColumn()
    companyFK: Company[];

    public constructor(article: Article, deliveryDate: Date, quantity: number, state: number, client: User) {
        this.article = article;
        this.deliveryDate = deliveryDate;
        this.quantity = quantity;
        this.state = state;
        this.client = client;
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

    public getState(): number {
        return this.state;
    }

    public setState(value: number): void {
        this.state = value;
    }

    public getClient(): User {
        return this.client;
    }
}