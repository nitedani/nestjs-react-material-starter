import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthService } from './local-auth.service';
import { LocalAuthStrategy } from './local-auth.strategy';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [LocalAuthController],
  providers: [LocalAuthStrategy, LocalAuthService],
})
export class LocalAuthModule {}
