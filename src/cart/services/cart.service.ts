import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { Cart } from '../cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly userRepository: Repository<Cart>) {};

  findByUserId(userId: string) {
    return this.userRepository.findOne({where: {id: userId}});
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      userId,
      items: [],
    };

    return this.userRepository.save(userCart);    
  }

  /*findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }
*/
}
