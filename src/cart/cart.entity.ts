import { CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from '../users/user.entity'
import { CartItem } from './cart_item.entity'

@Entity()
export class Cart extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(
    () => CartItem,
    items => items.cart
  )
  items: CartItem[];

}