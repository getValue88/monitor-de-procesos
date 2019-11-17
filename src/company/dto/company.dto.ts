import { Entity } from "typeorm";

export class CompanyDTO {
    readonly name: string;
    readonly rs: string;
    readonly address: string;
    readonly impositiveCategory: string;
    readonly cuit: string;
    readonly logo?: string;
}