import { Module } from '@nestjs/common';
import { AppModule } from 'src/server/app/app.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AppModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'webapp'),
    }),
  ],
})
export class ServerModule {}
