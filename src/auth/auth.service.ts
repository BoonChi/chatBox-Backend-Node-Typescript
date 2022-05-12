import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UsersCreateDto, UsersDto } from '@users/dto/users.dto';
import { JwtPayload } from '@users/type/i-jwt';
import { UsersService } from '@users/users.service';
import { AuthCredential } from './type/i-auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userDto: UsersCreateDto): Promise<AuthCredential> {
    const newUser = await this.usersService.create(userDto);
    return this._createToken(newUser.email);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthCredential> {
    await this.usersService.findByLogin(loginUserDto);
    return this._createToken(loginUserDto.email);
  }

  private _createToken(email: UsersDto['email']): AuthCredential {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
      email
    };
  }

  async validateUser(payload: JwtPayload): Promise<UsersDto> {
    const user = await this.usersService.getSingle(payload.email);
    if (!user) {
      throw new HttpException('Invalid token from validateUser', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
