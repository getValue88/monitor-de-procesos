import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';


@Injectable()
export class UserService {
    public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    public async login(uData: any): Promise<any> {
        try {
            let uFound = await this.userRepository.findOne({ where: { name: uData['username'] } });

            if (uFound) {
                if (uData['password'] === uFound.getPassword()) {
                    return {
                        'id': `${uFound.getID()}`,
                        'username': `${uFound.getName()}`,
                        'privilege': `${uFound.getPrivilege()}`,
                        'response': 'ok'
                    }
                } else {
                    return {
                        'response': null
                    };
                }
            } else {
                return {
                    'response': null
                };
            }
        }
        catch {
            return null;
        }
    }

    public async getCompany(userID): Promise<Company> {
        try {
            let user: User = await this.userRepository.findOne({ relations: ['company'], where: { id: userID } });
            return user.getCompany();
        }
        catch {
            return null;
        }
    }

    public async getSupervisoresByCompanyId(companyId: number): Promise<User[]> {
        try {
            return await this.userRepository.createQueryBuilder('user')
                .innerJoin('user.company', 'co')
                .select(['user.id', 'user.name'])
                .where({ privilege: 'supervisor' })
                .andWhere('co.id= :coId', { coId: companyId })
                .getMany();
        } catch (error) {
            return null;
        }
    }
}
