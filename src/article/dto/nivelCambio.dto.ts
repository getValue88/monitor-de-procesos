import { Process } from "src/process/entities/process.entity";

export class NivelCambioDTO {
    readonly id: number;
    readonly date: Date;
    readonly process: Process;
    readonly plano: string;
    readonly image?: string;
}