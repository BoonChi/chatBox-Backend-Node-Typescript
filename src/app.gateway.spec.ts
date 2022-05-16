import { ConversationsService } from '@conversations/conversations.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;
  const JwtServiceMock = jest.fn().mockImplementation(() => {
    return {
      decode: jest.fn(),
    };
  });
  const ConversationsServiceMock = jest.fn().mockImplementation(() => {
    return {
      create: jest.fn(),
    };
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppGateway,
        {
          provide: JwtService,
          useValue: JwtServiceMock,
        },
        {
          provide: ConversationsService,
          useValue: ConversationsServiceMock,
        },
      ],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be defined', async () => {
    await gateway.handleMessage('rest' as any, 'testing');
    expect(JwtServiceMock).toBeCalledTimes(1);
    expect(ConversationsServiceMock).toBeCalledTimes(1);
  });
});
