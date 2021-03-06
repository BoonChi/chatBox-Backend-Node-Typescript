import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConversationModule } from './conversations/conversations.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphqlAppModule } from './graphql/graphql.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  providers: [AppGateway],
  imports: [
    ConfigModule.forRoot({}),
    ConversationModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    GraphqlAppModule,
    RedisCacheModule,
  ],
})
export class AppModule {}
