import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { Repository } from 'typeorm';
import { StandardProcessDTO } from './dto/standardProcess.dto';
import { StandardProcess } from './entities/standardProcess.entity';

@Injectable()
export class ProcessService {
    public constructor(
        @InjectRepository(StandardTask) private readonly stdTaskRepository: Repository<StandardTask>,
        @InjectRepository(StandardProcess) private readonly stdProcessRepository: Repository<StandardProcess>) { }

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
                    i+1
                );
                processTime += parseInt(task['requiredTime']);
                await this.stdTaskRepository.save(newStdTask);
            });
            await this.stdProcessRepository.update(process, { 'requiredTime': processTime });
            return true;
        }
        catch{
            return false;
        }
    }

    public async createStandardProcess(standardProcessDto: StandardProcessDTO): Promise<any> {
        try {
            let newStdPrc = new StandardProcess(
                standardProcessDto['name'],
                standardProcessDto['description']
            );

            await this.stdProcessRepository.save(newStdPrc);
            return await this.stdProcessRepository.createQueryBuilder('process')
                .select(['process.id'])
                .where({
                    'name': standardProcessDto['name'],
                    'description': standardProcessDto['description']
                }).getOne();

        }
        catch {
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
        }
        catch {
            return false;
        }
    }
}