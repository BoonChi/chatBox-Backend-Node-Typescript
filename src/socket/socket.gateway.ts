import {
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { AuthSocket, WSAuthMiddleware } from 'src/auth/socket.auth.middleware';
import { ConversationsService } from '@conversations/conversations.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: '/', //this is the namespace, which manager.socket(nsp) connect to
})
export class WSGateway implements NestGateway {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private conversationService: ConversationsService

  ) { }
  @WebSocketServer()
  server: SocketIOServer;

  private logger = new Logger('AppGateway')

  afterInit(server: SocketIOServer) {
    const auth = WSAuthMiddleware(this.jwtService, this.userService)
    server.use(auth)
    console.log(`WS ${WSGateway.name} init`);
  }
  handleDisconnect(client: Socket) {
    console.log('client disconnect', client.id);
  }

  handleConnection(client: AuthSocket, ...args: any[]) {
    console.log('client connect', client.id, client.authorizedUser);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(payload: string, @ConnectedSocket() client: AuthSocket): void {
    this.logger.log(payload, 'catch from client');
    this.server.emit('msgToClient', payload);
    this.conversationService.create(client.authorizedUser, { text: payload });
  }

}
