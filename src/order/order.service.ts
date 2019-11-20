import { Injectable } from '@nestjs/common';
import { PurchaseOrderDTO } from './dto/purchaseOrder.dto';
import { PurchaseOrder } from './entities/purchaseOrder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { Article } from '../article/entities/article.entity';

@Injectable()
export class OrderService {
    public constructor(
        @InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>
    ) { }

    public async createPurchaseOrder(purchaseOrderDto: PurchaseOrderDTO): Promise<PurchaseOrder[]> {
        try {
            let client = await this.userRepository.findOne({ where: { id: purchaseOrderDto['client'] } });
            let company = await this.companyRepository.findOne({ where: { id: purchaseOrderDto['company'] } });
            let article = await this.articleRepository.findOne({ where: { id: purchaseOrderDto['article'] } });
            let newPurchaseOrder = new PurchaseOrder(
                purchaseOrderDto['deliveryDate'],
                purchaseOrderDto['quantity'],
                article,
                client,
                company
            );
            await this.purchaseOrderRepository.save(newPurchaseOrder);
            return this.purchaseOrderRepository.find({ relations: ['article'], where: { clientId: purchaseOrderDto['client'] } });
        }
        catch {
            return null;
        }
    }
}
