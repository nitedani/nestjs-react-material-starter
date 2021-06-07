import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppModule } from './app/app.module';

@Module({
  imports: [
    AppModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'webapp'),
    }),
  ],
})
export class ServerModule {}
