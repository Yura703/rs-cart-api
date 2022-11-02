import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';

import { User } from '../user.entity';

@Injectable()
export class UsersService { 

  constructor(private readonly userRepository: Repository<User>) {}

  async findOne(userId: string) {
    return this.userRepository.findOne({where: {id: userId}});
  }

  async createOne(createUserDTO: User) {
    const id = v4(v4());
    const newUser = { id: id, ...createUserDTO };

    return this.userRepository.save(newUser);
  }

}
