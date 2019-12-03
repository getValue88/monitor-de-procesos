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
            let article = await this.articleRepository.findOne({ relations: ['company'], where: { id: purchaseOrderDto['article'] } });
            let newPurchaseOrder = new PurchaseOrder(
                purchaseOrderDto['deliveryDate'],
                purchaseOrderDto['quantity'],
                article,
                client,
                article['company']
            );
            await this.purchaseOrderRepository.save(newPurchaseOrder);
            return this.getPurchaseOrdersByUserId(purchaseOrderDto['client']);
        }
        catch {
            return null;
        }
    }

    public async getPurchaseOrdersByCompanyId(companyId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.company', 'comp')
                .where('comp.id= :coId', { coId: companyId })
                .getMany();
        }
        catch {
            return null;
        }
    }

    public async getPurchaseOrdersByUserId(userId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.client', 'cli')
                .where('cli.id= :cId', { cId: userId })
                .getMany();
        }
        catch {
            return null;
        }
    }
}
