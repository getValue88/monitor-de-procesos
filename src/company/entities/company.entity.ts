import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable } from "typeorm";
// import { Article } from "../../article/entities/article.entity";
import { Oc } from "../../order/entities/oc.entity";
import { Of } from "../../order/entities/of.entity";
// import { Record } from "../../process/entities/record.entity";

@Entity()
export class Company {
    private static instance: Company;

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column()
    private logo?: string;


    // articles: Article[];


    // private of: Of[];

 
    // private record: Record;
    

    @OneToMany(type => Oc, oc => oc.getID, {
        cascade: true
    })
    oc: Oc[];

    @OneToMany(type => Of, of => of.getID, {
        cascade: true
    })
    of: Of[];

    private constructor() {
    }

    public getInstance(): Company {
        if (!Company.instance) {
            Company.instance = new Company();
        }
        // this.record = this.record.getInstance();
        return Company.instance;
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

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getLogo(): string {
        return this.logo;
    }

    public setLogo(path: string): void {
        this.logo = path;
    }

/*     public getArticles(): Article[] {
        return this.articles;
    }

    public setArticles(articles: Article[]): void {
        this.articles = articles;
    }
 */
    public getOc(): Oc[] {
        return this.oc;
    }

    public setOc(oc: Oc[]): void {
        this.oc = oc;
    }

    public getOf(): Of[] {
        return this.of;
    }

    public setOf(_of: Of[]): void {
        this.of = _of;
    }

/*     public getRecord(): Record {
        return this.record;
    } */
}