import { mockedJwtService, mockedUsersService } from '@mock/helper';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/users.service';
import appConfig from '@config/app.config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const user = {
    email: 'test@gmail.com',
    password: 'testPassword',
  };
  const credential = {
    expiresIn: appConfig.expiresIn,
    accessToken: 'test token',
    email: 'test@gmail.com',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: UsersService,
          useValue: mockedUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error if there is no email', async () => {
    await expect(service.register(null)).rejects.toThrow();
  });

  it('should throw typeError if there is no password', async () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    await expect(
      service.register({ email: user.email } as any),
    ).rejects.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: { isNotEmpty: 'password should not be empty' },
        }),
      ]),
    );
  });

  it('should register a user', async () => {
    const response = await service.register(user);
    expect(mockedUsersService.create).toBeCalledTimes(1);
    expect(mockedJwtService.sign).toBeCalledTimes(1);
    expect(response).toStrictEqual(credential);
  });

  // it('should login', async () => {
  //   const response = await service.login(null);
  //   expect(mockedUsersService.findByLogin).toBeCalledTimes(1);
  //   expect(response).toStrictEqual(credential)
  // });

  // it('should validate a user', async () => {
  //   const response = await service.validateUser(null);
  //   expect(mockedUsersService.getSingle).toBeCalledTimes(1);
  //   expect(response).toStrictEqual(credential.email)
  // });
});
