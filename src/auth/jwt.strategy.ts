import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from '@users/dto/users.dto';
import { JwtPayload } from '@users/type/i-jwt';
import appConfig from '@config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.secretKey,
    });
  }

  async validate(payload: JwtPayload): Promise<UsersDto> {
    const user = await this.authService.validateUser(payload);
    return user;
  }
}
