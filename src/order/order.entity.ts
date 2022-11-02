import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

import {User} from "../users/user.entity"; 

@Entity()
export class Order extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid')
  public cart_id: string;

  @Column({type: 'jsonb'})
  public payment: { name: string; value: string };

  @Column({type: 'jsonb'})
  public delivery: { name: string; value: string };

  @Column('text')
  public comments: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User

}