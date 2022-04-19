import { Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ConversationsService } from './conversations/conversations.service';

@WebSocketGateway(parseInt(process.env.SOCKET_PORT, 10), {
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private conversationService: ConversationsService) { }
  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(payload: string, @ConnectedSocket() client: Socket,): void {
    const token = client.handshake.headers.authorization
    console.log(token)
    const user = {
      username: "abu",
      email: ""
    }
    this.logger.log(payload, 'catch from client');
    this.server.emit('msgToClient', payload);
    this.conversationService.create(user, { text: payload });
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
