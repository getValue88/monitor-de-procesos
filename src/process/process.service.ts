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
            let processTime;
            stdTask.forEach(async (task) => {
                let newStdTask = new StandardTask(
                    task['name'],
                    task['description'],
                    task['requiredTime'],
                    task['parentTask'],
                    process
                );
                await this.stdTaskRepository.save(newStdTask);
            });
           /*  processTime = this.stdTaskRepository.createQueryBuilder('time')
                .select('SUM(time.requiredTime)', 'sum')
                .where({ id: process }) */
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
                // standardProcessDto['requiredTime'],
            );

            await this.stdProcessRepository.save(newStdPrc);
            return await this.stdProcessRepository.createQueryBuilder('process')
                .select(['process.id'])
                .where({
                    'name': standardProcessDto['name'],
                    'description': standardProcessDto['description']
                    // 'requiredTime': standardProcessDto['requiredTime']
                }).getOne();

        }
        catch {
            return null;
        }
    }
}
