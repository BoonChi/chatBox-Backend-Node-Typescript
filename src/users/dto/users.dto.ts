import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
}

export class UsersCreateDto extends LoginUserDto {}
