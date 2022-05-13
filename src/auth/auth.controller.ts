import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, UsersCreateDto } from '@users/dto/users.dto';
import { AuthService } from './auth.service';
import { AuthCredential } from './type/i-auth';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  public async register(
    @Body() createUserDto: UsersCreateDto,
  ): Promise<AuthCredential> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<AuthCredential> {
    return await this.authService.login(loginUserDto);
  }
}
