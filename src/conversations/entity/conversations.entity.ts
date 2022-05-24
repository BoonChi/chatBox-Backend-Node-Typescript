import { DbAwareColumn } from '@common/decorator/sqliteColumn.decorator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UsersEntity } from '@users/entity/users.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  text: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  @DbAwareColumn({ type: 'timestamp' })
  createdDate: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  @DbAwareColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => UsersEntity)
  owner: UsersEntity;
}
