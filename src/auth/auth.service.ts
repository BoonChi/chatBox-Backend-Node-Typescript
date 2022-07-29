import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UsersCreateDto, UsersDto } from '@users/dto/users.dto';
import { JwtPayload } from '@users/type/i-jwt';
import { UsersService } from '@users/users.service';
import appConfig from '@config/app.config';
import { AuthCredential } from './type/i-auth';
import { guard, validateParam } from '@common/decorator/parameter.decorator';
import { RedisCacheService } from '@redis/redis-cache.service';
import { RedisKey } from '@redis/redis-key';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private cacheManager: RedisCacheService,
  ) {}

  @validateParam(UsersCreateDto)
  async register(@guard userDto: UsersCreateDto): Promise<AuthCredential> {
    const newUser = await this.usersService.create(userDto);
    return this._createToken(newUser.email, userDto.isRememberChosen);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthCredential> {
    const userEmail = await this.usersService.findByLogin(loginUserDto);
    return this._createToken(userEmail, loginUserDto.isRememberChosen);
  }

  private async _createToken(
    email: UsersDto['email'],
    isRememberChosen = false,
  ): Promise<AuthCredential> {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    const userDetails = {
      expiresIn: isRememberChosen ? '60d' : appConfig.expiresIn,
      accessToken,
      email,
    };
    await this.cacheManager.set(RedisKey.CurrentUser, userDetails);

    return userDetails;
  }

  async validateUser(payload: JwtPayload): Promise<UsersDto> {
    const user = await this.usersService.getSingle(payload.email);
    if (!user) {
      throw new HttpException(
        'Invalid token from validateUser',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
