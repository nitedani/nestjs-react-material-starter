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
  async register(
    @Body() newUser: { email: string; password: string },
    @Res() res: Response,
  ) {
    const verify = process.env.LOCAL_SIGNUP_VERIFY === 'true';
    if (verify) {
      const message = await this.localAuthService.registerVerified(newUser);
      res.status(201).json({ message });
      return;
    }
    const user = await this.localAuthService.registerUnverified(newUser);
    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie('jwt', accessToken);
    res.sendStatus(201);
  }

  @Post('verify/:token')
  async verify(@Param('token') token: string) {
    return this.localAuthService.verify(token);
  }
}
