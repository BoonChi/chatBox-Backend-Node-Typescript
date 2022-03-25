import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Conversation } from 'src/conversations/conversation.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5400,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'chatbox_db',
  entities: [Conversation],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    'src/migration/**/*.ts'
  ],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migration',
  },
};
export = typeOrmConfig;
