import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardTask } from './entities/standardTask.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcessService {
    public constructor(@InjectRepository(StandardTask) private readonly stdTaskRepository: Repository<StandardTask>) { }

    public async createStdTask(stdTask): Promise<boolean> {
        try {
            let newStdTask = new StandardTask(
                stdTask['name'],
                stdTask['description'],
                stdTask['requiredTime'],
                stdTask['process']
            );
            await this.stdTaskRepository.save(newStdTask);
            
            return true;
        }
        catch{
            return false;
        }
    }
}
