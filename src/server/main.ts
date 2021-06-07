import * as dotenv from 'dotenv';
const ENV = process.env.NODE_ENV;
dotenv.config({ path: !ENV ? '.env' : `.env.${ENV}` });
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ServerModule } from 'src/server/server.module';
import { clientDevServer } from './clientDevServer';
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
  const port = process.env.PORT || 8080;
  if (process.env.NODE_ENV !== 'production') {
    clientDevServer(app, port);
  }
  await nestApp.listen(port);
}
bootstrap();
