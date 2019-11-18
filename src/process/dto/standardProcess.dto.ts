import { StandardTask } from "../entities/standardTask.entity";

export class StandardProcessDTO {
    readonly name: string;
    readonly description: string;
    readonly requiredTime: number;
}