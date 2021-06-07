import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';
const ENV = process.env.NODE_ENV;
const ConfigModule_ = ConfigModule.forRoot({
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,
  isGlobal: true,
});
@Module({
  imports: [ConfigModule_, AuthModule, UsersModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
