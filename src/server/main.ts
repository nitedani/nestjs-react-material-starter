import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ServerModule } from 'src/server/server.module';
import { clientDevServer } from './initWebpack';
import express from 'express';

async function bootstrap() {
  const ea = new ExpressAdapter();
  const app: express.Express = ea.getInstance();
  const nestApp = await NestFactory.create<NestExpressApplication>(
    ServerModule,
    ea,
  );
  nestApp.setGlobalPrefix('api');
  nestApp.use(cookieParser());
  nestApp.set('trust proxy', true);
  nestApp.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    clientDevServer(app);
  }
  await nestApp.listen(process.env.PORT || 8080);
}
bootstrap();
