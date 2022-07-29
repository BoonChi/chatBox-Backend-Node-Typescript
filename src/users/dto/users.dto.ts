import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UsersDto {
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsOptional() isRememberChosen?: boolean;
}

export class UsersCreateDto extends LoginUserDto {}
