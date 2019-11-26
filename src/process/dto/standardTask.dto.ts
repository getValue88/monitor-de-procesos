export class StandardTaskDTO{
    readonly name: string;
    readonly description:string;
    readonly requiredTime: number;
    readonly parentTask: number;
    readonly process: number;
}