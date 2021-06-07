import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';

/**
 * Abstract socket gateway for authentication
 *
 * Extend this class for an authenticated socket connection
 * @export
 * @class PrivateSocketGateway
 * @implements {OnGatewayConnection}
 */
@WebSocketGateway()
export class PrivateSocketGateway implements OnGatewayConnection {
  constructor(private jwtService?: JwtService) {}
  handleConnection(socket: Socket) {
    const unauthorized = () => {
      socket.emit('error', new UnauthorizedException());
      socket.disconnect();
    };
    try {
      const cookies = parse(socket.handshake.headers.cookie);
      const valid = this.jwtService.verify(cookies.jwt);
      if (!valid) {
        unauthorized();
        return;
      }
    } catch (error) {
      unauthorized();
      return;
    }
  }
}
