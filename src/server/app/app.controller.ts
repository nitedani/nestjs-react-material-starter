import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cat')
  getCat(): string {
    return 'a cat';
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate(@Req() req) {
    return req.user;
  }
}
