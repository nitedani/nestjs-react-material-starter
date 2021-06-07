import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../auth/jwt/jwt-auth.module';
import { SocketGateway } from './gateways/socket.gateway';
import { PrivateSocketGateway } from './private.gateway';

@Module({
  imports: [JwtAuthModule],
  providers: [SocketGateway, PrivateSocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
