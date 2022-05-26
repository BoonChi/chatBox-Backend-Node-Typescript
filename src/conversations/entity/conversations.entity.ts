import { DbAwareColumn } from '@common/decorator/sqliteColumn.decorator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UsersEntity } from '@users/entity/users.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('conversation')
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  text: string;

  @Field(() => Date)
  @DbAwareColumn({ type: 'timestamp' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Field(() => Date)
  @DbAwareColumn({ type: 'timestamp' })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;

  @ManyToOne(() => UsersEntity)
  owner: UsersEntity;
}
