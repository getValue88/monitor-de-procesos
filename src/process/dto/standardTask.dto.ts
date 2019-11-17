import { StandardProcess } from "../entities/standardProcess.entity";

export class StandardTaskDTO{
    readonly name: string;
    readonly description:string;
    readonly requiredTime: number;
    readonly process: StandardProcess;
}