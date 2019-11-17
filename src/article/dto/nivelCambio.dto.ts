import { StandardProcess } from "../../process/entities/standardProcess.entity";

export class NivelCambioDTO {
    readonly date: Date;
    readonly plan: string;
    readonly standardProcess: StandardProcess;
    readonly image?: string;
}