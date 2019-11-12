import { Process } from './process/process.entity';
import { NivelCambio } from './article/nivelCambio.entity';

export class ArticleDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly process: Process;
    readonly nivelCambio: NivelCambio;
    readonly plano: string;
    readonly image?: string;
}