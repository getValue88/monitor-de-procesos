import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Oc } from "./oc.entity";

@Entity()
export class Of {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private admin: User;

    @Column()
    private initialDate: Date;

    @Column()
    private endDate: Date;

    @Column()
    private items: Oc[] = [];

    public constructor(id: number, admin: User, initialDate: Date, endDate: Date, items: Oc[]) {
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