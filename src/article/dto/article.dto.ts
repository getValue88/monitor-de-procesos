import { NivelCambio } from '../entities/nivelCambio.entity';
import { Company } from 'src/company/entities/company.entity';

export class ArticleDTO {
    readonly id: number;
    readonly number: number;
    readonly name: string;
    readonly nivelCambio: NivelCambio;
    readonly description?: string;
    readonly company: Company;
}