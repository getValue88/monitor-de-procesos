import { Process } from '../../process/entities/process.entity';
import { NivelCambio } from '../entities/nivelCambio.entity';

export class ArticleDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly nivelCambio: NivelCambio;
}