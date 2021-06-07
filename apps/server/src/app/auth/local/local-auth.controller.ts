import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalAuthService } from './local-auth.service';

@Controller('auth/local')
export class LocalAuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private localAuthService: LocalAuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken);
    return res.redirect('/');
  }

  @Post('register')
  async register(@Body() newUser: { email: string; password: string }) {
    return this.localAuthService.register(newUser);
  }

  @Post('verify/:token')
  async verify(@Param('token') token: string) {
    return this.localAuthService.verify(token);
  }
}
