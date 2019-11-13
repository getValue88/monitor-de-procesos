import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Alarm {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private description: string;

    @Column()
    private disparador: boolean;

    @Column()
    private date: Date;

    public constructor(id: number, description: string, disparador: boolean, date: Date) {
        this.id = id;
        this.description = description;
        this.disparador = false;
        this.date = date;
    }

    public getID(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getDisparador(): boolean {
        return this.disparador;
    }

    public setDisparador(value: boolean): void {
        this.disparador = value;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(value: Date): void {
        this.date = value;
    }
}