import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { Repository } from 'typeorm';
import { StandardProcessDTO } from './dto/standardProcess.dto';
import { StandardProcess } from './entities/standardProcess.entity';
import { ManufactureOrder } from '../order/entities/manufactureOrder.entity';
import { ConcreteProcess } from './entities/concreteProcess.entity';
import { ConcreteTask } from './entities/concreteTask.entity';

@Injectable()
export class ProcessService {
    public constructor(
        @InjectRepository(StandardTask) private readonly stdTaskRepository: Repository<StandardTask>,
        @InjectRepository(StandardProcess) private readonly stdProcessRepository: Repository<StandardProcess>,
        @InjectRepository(ConcreteProcess) private readonly concreteProcessRepository: Repository<ConcreteProcess>,
        @InjectRepository(ConcreteTask) private readonly concreteTaskRepository: Repository<ConcreteTask>) { }

    public async createStdTask(stdTask): Promise<boolean> {
        try {
            let process = stdTask[0]['process'];
            let processTime = 0;

            stdTask.forEach(async (task, i) => {
                let newStdTask = new StandardTask(
                    task['name'],
                    task['description'],
                    task['requiredTime'],
                    process,
                    i + 1
                );

                processTime += parseInt(task['requiredTime']);
                await this.stdTaskRepository.save(newStdTask);
            });

            await this.stdProcessRepository.update(process, { 'requiredTime': processTime });
            return true;
        } catch{
            return false;
        }
    }

    public async createStandardProcess(standardProcessDto: StandardProcessDTO): Promise<any> {
        try {
            await this.stdProcessRepository.save(new StandardProcess(
                standardProcessDto['name'],
                standardProcessDto['description']
            ));

            return await this.stdProcessRepository.createQueryBuilder('process')
                .select(['process.id'])
                .where({
                    'name': standardProcessDto['name'],
                    'description': standardProcessDto['description']
                })
                .getOne();

        } catch {
            return null;
        }
    }

    public async getProcessById(processId: number): Promise<StandardProcess> {
        try {
            return await this.stdProcessRepository.findOne({ where: { id: processId } });
        }
        catch {
            return null;
        }
    }

    public async updateStdProcess(id: number, standardProcessDto: StandardProcessDTO): Promise<Boolean> {
        try {
            let toUpdateProcess = await this.stdProcessRepository.findOne(id);

            toUpdateProcess['name'] = standardProcessDto['name'];
            toUpdateProcess['description'] = standardProcessDto['description'];
            await this.stdProcessRepository.save(toUpdateProcess);

            return true;

        } catch {
            return false;
        }
    }

    public async createConcreteProcess(manufactureOrder: ManufactureOrder): Promise<void> {
        const newConcreteProcess = new ConcreteProcess(
            manufactureOrder.getPurchaseOrder().getArticle().getNivelCambio().getProcess(),
            0,
            manufactureOrder.getInitialDate(),
            manufactureOrder.getDeliveryDate(),
            manufactureOrder.getSupervisor(),
            manufactureOrder.getID(),
            null
        );
        await this.concreteProcessRepository.save(newConcreteProcess);

        this.createConcreteTasks(newConcreteProcess);
    }

    private async createConcreteTasks(concreteProcess: ConcreteProcess): Promise<Boolean> {
        try {
            const stdTask = await this.stdTaskRepository.createQueryBuilder('stdTask')
                .innerJoin('stdTask.process', 'process')
                .where('process.id = :prId', { prId: concreteProcess.getStandardProcess().getID() })
                .getMany();

            stdTask.forEach(async (task, i) => {
                let initialDate: Date = null;
                let deliveryDate: Date = null;
                if (i == 0) {
                    initialDate = new Date(concreteProcess.getInitialDate());
                    deliveryDate = new Date(initialDate);
                    deliveryDate.setMinutes(deliveryDate.getMinutes() + task.getRequiredTime());
                }

                await this.concreteTaskRepository.save(new ConcreteTask(
                    initialDate,
                    deliveryDate,
                    task,
                    concreteProcess,
                    task.getCode()
                ));
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    public async updateConcreteTaskStatus(id: number, status: number): Promise<boolean> {
        try {
            let concreteTask = await this.concreteTaskRepository.findOne({ relations: ['concreteProcess','standardTask'], where: { id: id } });

            concreteTask.setStatus(status['status']); 
            
            this.updateConcreteProcessStatus(concreteTask.getConcreteProcess(),concreteTask.getStandardTask().getRequiredTime());
            //console.log(concreteTask.getStandardTask().getRequiredTime());

            if (status['status'] >= 100) {
                concreteTask.setEndDate(new Date());

                let nextTask = await this.concreteTaskRepository.createQueryBuilder('nxtTask')
                    .where({ concreteProcess: concreteTask.getConcreteProcess() })
                    .andWhere('code =:cd', { cd: concreteTask.getCode() + 1 })
                    .getOne();

                if (nextTask) {
                    const stdTask = await this.stdTaskRepository.findOne(nextTask.getStandardTask());
                    const requiredTime = stdTask.getRequiredTime();
                    let deliveryDate;

                    nextTask.setInitialDate(new Date());
                    deliveryDate = new Date(nextTask.getInitialDate());
                    deliveryDate.setMinutes(deliveryDate.getMinutes() + requiredTime)
                    nextTask.setDeliveryDate(deliveryDate);

                    await this.concreteTaskRepository.save(nextTask);
                }
            }
            await this.concreteTaskRepository.save(concreteTask);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private async updateConcreteProcessStatus (concreteProcess: ConcreteProcess, taskTime: number) : Promise<Boolean> {
        try {
            
            let concreteProcessTime = concreteProcess.getDeliveryDate().getTime() - concreteProcess.getInitialDate().getTime();
            concreteProcessTime = concreteProcessTime/(1000*60);
            console.log(concreteProcessTime);    
            concreteProcess.setStatus(Math.round((taskTime*100)/concreteProcessTime));
            await this.concreteProcessRepository.save(concreteProcess);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}