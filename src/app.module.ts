import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ConversationModule } from './conversations/conversation.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [ConfigModule.forRoot({}), ConversationModule, DatabaseModule],
})
export class AppModule { }
