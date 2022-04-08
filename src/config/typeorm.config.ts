import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConversationEntity } from '@conversations/entity/conversations.entity';
import { UsersEntity } from '@users/entity/users.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5400,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'chatbox_db',
  entities: [ConversationEntity, UsersEntity],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migration',
  },
};
export = typeOrmConfig;
