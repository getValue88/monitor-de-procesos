import { Task } from '../entities/task.entity';

export class TaskDTO{
    readonly id:number;
    readonly description:string;
    readonly estimatedTime: number;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly state: number;
    readonly previousTask: Task[];
}