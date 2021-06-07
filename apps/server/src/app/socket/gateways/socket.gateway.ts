import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { DISCONNECT_EVENT } from '@nestjs/websockets/constants';
import { fromEvent, interval } from 'rxjs';
import { first, share, takeUntil } from 'rxjs/operators';
import { Socket } from 'socket.io';
import { PrivateSocketGateway } from '../private.gateway';

@WebSocketGateway()
export class SocketGateway
  extends PrivateSocketGateway
  implements OnGatewayConnection
{
  constructor() {
    super();
  }

  handleConnection(socket: Socket) {
    const disconnect$ = fromEvent(socket, DISCONNECT_EVENT).pipe(
      share(),
      first(),
    );

    interval(1000)
      .pipe(takeUntil(disconnect$))
      .subscribe((i) => socket.emit('randomNumber', i));
  }

  @SubscribeMessage('message')
  message(@MessageBody() message: string) {
    console.log(`Message from client ${message}`);
  }
}
