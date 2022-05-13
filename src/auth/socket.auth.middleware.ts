import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@users/type/i-jwt';
import { UsersService } from '@users/users.service';
import { Socket } from 'socket.io';
import { IReq } from 'src/common/type/common.type';

export interface AuthSocket extends Socket {
  authorizedUser: IReq['user'];
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;
export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UsersService,
): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const jwtPayload = jwtService.decode(
        socket.handshake.headers.authorization,
      ) as JwtPayload;
      const userResult = await userService.getSingle(jwtPayload.email);
      if (userResult.email) {
        socket.authorizedUser = userResult;
        next();
      } else {
        next({
          name: 'Unauthorized',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      next({
        name: 'Unauthorized',
        message: 'Unauthorized',
      });
    }
  };
};
