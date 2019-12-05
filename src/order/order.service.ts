import { Injectable } from '@nestjs/common';
import { PurchaseOrderDTO } from './dto/purchaseOrder.dto';
import { PurchaseOrder } from './entities/purchaseOrder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { Article } from '../article/entities/article.entity';
import { ManufactureOrderDTO } from './dto/manufactureOrder.dto';
import { ManufactureOrder } from './entities/manufactureOrder.entity';

@Injectable()
export class OrderService {
    public constructor(
        @InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(ManufactureOrder) private readonly manufactureOrderRepository: Repository<ManufactureOrder>
    ) { }

    public async createPurchaseOrder(purchaseOrderDto: PurchaseOrderDTO): Promise<PurchaseOrder[]> {
        try {
            let client = await this.userRepository.findOne({ where: { id: purchaseOrderDto['client'] } });
            let article = await this.articleRepository.findOne({ relations: ['company'], where: { id: purchaseOrderDto['article'] } });

            await this.purchaseOrderRepository.save(new PurchaseOrder(
                purchaseOrderDto['deliveryDate'],
                purchaseOrderDto['quantity'],
                article,
                client,
                article['company']
            ));

            return this.getPurchaseOrdersByUserId(purchaseOrderDto['client']);

        } catch {
            return null;
        }
    }

    public async getPurchaseOrdersByCompanyId(companyId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.company', 'comp')
                .where('comp.id= :coId', { coId: companyId })
                .getMany();

        } catch {
            return null;
        }
    }

    public async getPurchaseOrdersByUserId(userId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.client', 'cli')
                .where('cli.id= :cId', { cId: userId })
                .getMany();

        } catch {
            return null;
        }
    }

    public async createManufactureOrder(manufactureOrderDto: ManufactureOrderDTO): Promise<Boolean> {
        try {
            const purchaseOrder = await this.purchaseOrderRepository.findOne({ where: { id: manufactureOrderDto['purchaseOrder'] } });
            const supervisor = await this.userRepository.findOne({ where: { id: manufactureOrderDto['supervisor'] } });
            const company = await this.companyRepository.findOne({ where: { id: manufactureOrderDto['company'] } });

            await this.manufactureOrderRepository.save(new ManufactureOrder(
                manufactureOrderDto['initialDate'],
                manufactureOrderDto['deliveryDate'],
                purchaseOrder,
                supervisor,
                company
            ));
            return true

        } catch {
            return false;
        }
    }

    public async getManufactureOrderByCompanyId(companyId: number): Promise<ManufactureOrder[]> {
        try {
            return await this.manufactureOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.company', 'comp')
                .innerJoinAndSelect('order.purchaseOrder', 'po')
                .innerJoinAndSelect('order.supervisor', 'sup')
                .where('comp.id= :coId', { coId: companyId })
                .getMany();

        } catch (error) {
            return null;
        }
    }
}
