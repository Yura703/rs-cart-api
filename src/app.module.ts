import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
//import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart';
import { UsersService } from "./users/services/users.service";
import { UserController } from './users/users.controller';
require('dotenv').config();
@Module({
  imports: [
    //AuthModule,
    CartModule,
    OrderModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + './**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [
    AppController,
    CartController,
    UserController
  ],
  providers: [CartService, UsersService],
})
export class AppModule {}
