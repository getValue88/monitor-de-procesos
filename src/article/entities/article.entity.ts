import { Process } from './process/process.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column()
    private process: Process;
    public constructor(name: string, description: string, process: Process) {
        this.name = name;
        this.description = description;
        this.process = process;
    }

}

