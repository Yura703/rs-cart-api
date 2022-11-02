import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { Cart } from '../cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: Repository<Cart>) {};

  async findByUserId(userId: string) {
    return this.cartRepository.findOne({where: {id: userId}});
  }

  async createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      userId,
      items: [],
    };

    return this.cartRepository.save(userCart);    
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    const newCart = {
      id: v4(),
      user: userCart, 
      created_at: new Date(),
      updated_at: new Date(),
    };

    return this.cartRepository.save( newCart);    
  }

  async updateByUserId(userId: string, { items }: Cart) {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    return this.cartRepository.update( id, updatedCart);     
  }

  async removeByUserId(userId: string) {
    const entity = await this.findByUserId(userId);
    return this.cartRepository.remove(entity);
  }
}
