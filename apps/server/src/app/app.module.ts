import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
