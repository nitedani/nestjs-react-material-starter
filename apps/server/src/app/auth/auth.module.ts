import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { LocalAuthModule } from './local/local-auth.module';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    ...(process.env.GOOGLE_AUTH_ENABLED === 'true' ? [GoogleOauthModule] : []),
    ...(process.env.LOCAL_AUTH_ENABLED === 'true' ? [LocalAuthModule] : []),
    JwtAuthModule,
  ],
})
export class AuthModule {}
