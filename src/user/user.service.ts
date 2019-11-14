import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
    public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    public async login(uData: any): Promise<any> {
        let uFound = await this.userRepository.findOne({ where: { name: uData['username'] } });
        if (uFound) {
            if (uData['password'] === uFound.getPassword()) {
                return {
                    'id': `${uFound.getID()}`,
                    'username': `${uFound.getName()}`,
                    'privilege': `${uFound.getPrivilege()}`
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
