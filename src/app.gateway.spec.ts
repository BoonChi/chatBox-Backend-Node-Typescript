import { ConversationsService } from '@conversations/conversations.service';
import { mockedConversationService, mockedJwtService } from '@mock/helper';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppGateway,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: ConversationsService,
          useValue: mockedConversationService,
        },
      ],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should call JwtService and ConversationsService', async () => {
    const socketInfo = {
      handshake: {
        headers: {
          authorization: 'testing token',
        },
      },
      emit: () => '',
    };
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    await gateway.handleMessage(socketInfo as any, 'testing');
    expect(mockedJwtService.decode).toBeCalledTimes(1);
    expect(mockedConversationService.create).toBeCalledTimes(1);
  });

  it('should throw error if there is no authorization header ', async () => {
    await expect(gateway.handleMessage(null, null)).rejects.toThrow(
      'Invalid request',
    );
  });
});
