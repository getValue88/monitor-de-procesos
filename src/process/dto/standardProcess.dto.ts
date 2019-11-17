import { StandardTask } from "../entities/standardTask.entity";

export class StandardProcessDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly standardTasks: StandardTask[];
    readonly requiredTime: number;
}