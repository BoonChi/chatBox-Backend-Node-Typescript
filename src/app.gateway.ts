import appConfig from '@config/app.config';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { JwtDecodePayload } from '@users/type/i-jwt';
import { Socket } from 'socket.io';
import { ConversationsService } from './conversations/conversations.service';

@WebSocketGateway(parseInt(appConfig.socketPort, 10), {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(
    private readonly jwtService: JwtService,
    private conversationService: ConversationsService,
  ) {}
  private logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    if (!client?.handshake?.headers?.authorization || !payload)
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    const jwtPayload = this.jwtService.decode(
      client.handshake.headers.authorization.replace('Bearer ', ''),
    ) as JwtDecodePayload;
    this.logger.log(jwtPayload, payload);
    client.emit('msgToClient', payload);
    await this.conversationService.create(
      {
        email: jwtPayload.email,
      },
      { text: payload },
    );
  }
}
