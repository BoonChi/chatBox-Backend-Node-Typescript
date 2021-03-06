import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entity/conversations.entity';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { UsersEntity } from '@users/entity/users.entity';
import { ConversationResolver } from './resolver/conversations.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationEntity, UsersEntity]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationResolver],
  exports: [ConversationsService],
})
export class ConversationModule {}
