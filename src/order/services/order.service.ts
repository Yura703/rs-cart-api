import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: Repository<Order>) {};

  async findById(orderId: string) {
    return this.orderRepository.findOne({where: {id: orderId}});
  }

  async create(data: any) {
    const id = v4(v4())
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    return this.orderRepository.save(order);
  }

  async update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const newOrder = {
      ...data,
      id: orderId,
    }
    return this.orderRepository.update(orderId,newOrder);
  }
}
