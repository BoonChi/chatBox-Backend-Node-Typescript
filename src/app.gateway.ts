import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtDecodePayload } from '@users/type/i-jwt';
import { Socket, Server } from 'socket.io';
import { ConversationsService } from './conversations/conversations.service';

@WebSocketGateway(parseInt(process.env.SOCKET_PORT, 10), {
  cors: {
    origin: '*',
  },
})
// @UseGuards(AuthGuard())
export class AppGateway {
  constructor(
    private readonly jwtService: JwtService,
    private conversationService: ConversationsService,
  ) {}
  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    const jwtPayload = this.jwtService.decode(
      client.handshake.headers.authorization.replace('Bearer ', ''),
    ) as JwtDecodePayload;

    this.logger.log(payload, 'catch from client', jwtPayload);
    this.server.emit('msgToClient', payload);
    await this.conversationService.create(
      {
        email: jwtPayload.email,
      },
      { text: payload },
    );
  }
}
