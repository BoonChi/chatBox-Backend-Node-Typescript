import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConversationEntity } from '@conversations/entity/conversations.entity';
import { UsersEntity } from '@users/entity/users.entity';
import appConfig from '@config/app.config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (appConfig.isTest) {
          return {
            type: 'sqlite',
            database: ':memory:',
            entities: [ConversationEntity, UsersEntity],
            synchronize: true,
          };
        } else {
          return {
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            entities: [ConversationEntity, UsersEntity],
            synchronize: true,
          };
        }
      },
    }),
  ],
})
export class DatabaseModule {}
