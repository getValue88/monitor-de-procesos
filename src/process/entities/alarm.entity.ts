import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Alarm {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private description: string;

    @Column()
    private disparador: boolean;

    public constructor(id: number, description: string, disparador: boolean) {
        this.id = id;
        this.description = description;
        this.disparador = false;
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
}