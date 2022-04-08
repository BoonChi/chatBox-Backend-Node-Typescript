import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class UsersCreateDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() readonly username: string;
  @IsNotEmpty() readonly password: string;
}
