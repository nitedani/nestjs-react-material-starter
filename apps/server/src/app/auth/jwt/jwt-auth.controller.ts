import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth/jwt')
export class JwtAuthController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getPrivate(@Req() req) {
    return req.user;
  }
}
