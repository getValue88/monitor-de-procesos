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
import { ProcessService } from '../process/process.service';

@Injectable()
export class OrderService {
    public constructor(
        @InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(ManufactureOrder) private readonly manufactureOrderRepository: Repository<ManufactureOrder>,
        private readonly processService: ProcessService
    ) { }

    public async createPurchaseOrder(purchaseOrderDto: PurchaseOrderDTO): Promise<PurchaseOrder[]> {
        try {
            const client = await this.userRepository.findOne({ where: { id: purchaseOrderDto['client'] } });
            const article = await this.articleRepository.findOne({ relations: ['company'], where: { id: purchaseOrderDto['article'] } });

            await this.purchaseOrderRepository.save(new PurchaseOrder(
                purchaseOrderDto['deliveryDate'],
                purchaseOrderDto['quantity'],
                article,
                client,
                article['company']
            ));

            return this.getPurchaseOrdersByClientId(purchaseOrderDto['client']);

        } catch (error){
            console.log(error);
            return null;
        }
    }

    public async getPurchaseOrdersByCompanyId(companyId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.company', 'comp')
                .innerJoinAndSelect('order.article', 'article')
                .where('comp.id= :coId', { coId: companyId })
                .getMany();

        } catch(error){
            console.log(error);
            return null;
        }
    }

    public async getPurchaseOrdersByClientId(clientId: number): Promise<PurchaseOrder[]> {
        try {
            return await this.purchaseOrderRepository.createQueryBuilder('order')
                .innerJoinAndSelect('order.client', 'cli')
                .innerJoinAndSelect('order.article', 'article')
                .where('cli.id= :cId', { cId: clientId })
                .getMany();

        } catch(error){
            console.log(error);
            return null;
        }
    }

    public async createManufactureOrder(manufactureOrderDto: ManufactureOrderDTO): Promise<Boolean> {
        try {
            const purchaseOrder = await this.purchaseOrderRepository.createQueryBuilder('purchase')
                .innerJoinAndSelect('purchase.article', 'article')
                .innerJoinAndSelect('article.nivelCambio', 'nivelCambio')
                .innerJoinAndSelect('nivelCambio.process', 'process')
                .where('purchase.id= :pId', { pId: manufactureOrderDto['purchaseOrder'] })
                .getOne();

            const supervisor = await this.userRepository.findOne({ where: { id: manufactureOrderDto['supervisor'] } });
            const company = await this.companyRepository.findOne({ where: { id: manufactureOrderDto['company'] } });

            const manufactureTime = purchaseOrder.getArticle().getNivelCambio().getProcess().getRequiredTime() * purchaseOrder.getQuantity();

            let deliveryDate = new Date(manufactureOrderDto['initialDate'])
            deliveryDate.setMinutes(deliveryDate.getMinutes() + manufactureTime);

            purchaseOrder.setStatus(1);

            const manufatureOrder = new ManufactureOrder(
                manufactureOrderDto['initialDate'],
                deliveryDate,
                purchaseOrder,
                supervisor,
                company
            );

            await this.manufactureOrderRepository.save(manufatureOrder);
            await this.purchaseOrderRepository.save(purchaseOrder);
            this.processService.createConcreteProcess(manufatureOrder);
            return true

        } catch(error){
            console.log(error);
            return false;
        }
    }

    public async getManufactureOrderByCompanyId(companyId: number): Promise<ManufactureOrder[]> {
        try {
            return await this.manufactureOrderRepository.createQueryBuilder('order')
                .innerJoin('order.company', 'comp')
                .innerJoinAndSelect('order.purchaseOrder', 'po')
                .innerJoin('order.supervisor', 'sup')
                .where('comp.id= :coId', { coId: companyId })
                .getMany();

        } catch(error){
            console.log(error);
            return null;
        }
    }

    public async getManufactureOrderBySupervisorId(supervisorId: number): Promise<ManufactureOrder[]> {
        try {
            return await this.manufactureOrderRepository.createQueryBuilder('order')
                .innerJoin('order.supervisor', 'sup')
                .where('sup.id = :supId', { supId: supervisorId })
                .getMany();

        } catch(error){
            console.log(error);
            return null;
        }
    }
}
