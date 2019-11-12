import { Process } from './process/process.entity';

export class ArticleDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly process: Process;
}