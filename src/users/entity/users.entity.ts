import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DbAwareColumn } from '@common/decorator/sqliteColumn.decorator';

@ObjectType()
@Entity('users')
export class UsersEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 300,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @DbAwareColumn({ type: 'timestamp' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @DbAwareColumn({ type: 'timestamp' })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
