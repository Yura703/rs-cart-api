import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { configService } from "src/data-source/data-source.service";

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService):  TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: "shop-music.cq7elyimyrte.eu-west-1.rds.amazonaws.com",
      port: 5432,
      username: "postgres",
      password: "yuRA123456789",
      database: "shop",
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
