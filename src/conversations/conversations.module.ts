import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entity/conversations.entity';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { UsersModule } from '@users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersEntity } from '@users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationEntity, UsersEntity]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationModule {}
