export class UserDTO{
    readonly id:number;
    readonly name:string;
    readonly password:string;
    readonly privilege: string;
    readonly observations?: string;
}