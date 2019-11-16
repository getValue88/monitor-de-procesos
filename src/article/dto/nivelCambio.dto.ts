import { StandardProcess } from "../../process/entities/standardProcess.entity";

export class NivelCambioDTO {
    readonly id: number;
    readonly date: Date;
    readonly plan: string;
    readonly image?: string;
    readonly process: StandardProcess;
}