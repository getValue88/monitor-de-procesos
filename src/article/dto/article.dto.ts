import { NivelCambio } from '../entities/nivelCambio.entity';
import { Company } from 'src/company/entities/company.entity';

export class ArticleDTO {
    readonly number: number;
    readonly name: string;
    readonly description?: string;
    readonly nivelCambio: NivelCambio;
    readonly company: Company;
}