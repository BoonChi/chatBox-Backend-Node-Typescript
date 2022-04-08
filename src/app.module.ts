import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ConversationModule } from './conversations/conversations.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [
    ConfigModule.forRoot({}),
    ConversationModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
