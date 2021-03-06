import * as dotenv from 'dotenv';
const ENV = process.env.NODE_ENV;
dotenv.config({ path: !ENV ? '.env' : `.env.${ENV}` });
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import express from 'express';
import { ServerModule } from './server.module';

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
  const port = process.env.PORT || 8080;
  if (process.env.NODE_ENV !== 'production') {
    import('./clientDevServer').then(({ default: devServer }) =>
      devServer(app, port),
    );
  }
  await nestApp.listen(process.env.PORT || 4000);
}
bootstrap();
