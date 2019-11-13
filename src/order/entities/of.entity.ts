import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Oc } from "./oc.entity";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Of {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    private admin: User;

    @Column()
    private initialDate: Date;

    @Column()
    private endDate: Date;

    // @Column()
    private items: Oc[] = [];

    @OneToOne(type => User)
    @JoinColumn()
    user_id: User;

    @OneToMany(type => Oc, oc => oc.id)
    ocs: Oc[];

    @OneToMany(type => Company, company => company.id, {
        cascade: true
    })
    @JoinColumn()
    companyFK: Company;

    public constructor(admin: User, initialDate: Date, endDate: Date, items: Oc[]) {
        this.admin = admin;
        this.initialDate = initialDate;
        this.endDate = endDate;
        this.items = items;
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

    public getItems(): Oc[] {
        return this.items;
    }
}