import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, OneToMany } from "typeorm";
import { Cart } from '../cart/cart.entity'
import { Order } from '../order/order.entity'

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart
}