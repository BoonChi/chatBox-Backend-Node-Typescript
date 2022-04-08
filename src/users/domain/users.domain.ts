import { IsEmail, IsString, IsUUID } from 'class-validator';
import { UsersEntity } from '../entity/users.entity';

export class UsersDomain implements Readonly<UsersDomain> {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: Date;

  public static toDto(entity: UsersEntity) {
    return {
      email: entity.email,
      username: entity.username,
    };
  }
}
