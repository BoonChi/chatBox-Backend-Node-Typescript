import { mockedAuthService } from '@mock/helper';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockedAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call register from AuthService', async () => {
    await controller.register(null);
    expect(mockedAuthService.register).toBeCalledTimes(1);
  });

  it('should call login from AuthService', async () => {
    await controller.login(null);
    expect(mockedAuthService.login).toBeCalledTimes(1);
  });
});
