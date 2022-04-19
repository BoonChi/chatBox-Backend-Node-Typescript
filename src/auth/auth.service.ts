import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UsersCreateDto, UsersDto } from '@users/dto/users.dto';
import { JwtPayload } from '@users/type/i-jwt';
import { UsersService } from '@users/users.service';
import { LoginStatus, RegistrationStatus } from './type/i-auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userDto: UsersCreateDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(loginUserDto.username);

    return {
      username: loginUserDto.username,
      ...token,
    };
  }

  private _createToken(username: UsersDto['username']): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UsersDto> {
    const user = await this.usersService.getSingle(payload.username);
    if (!user) {
      throw new HttpException('Invalid token from validateUser', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
