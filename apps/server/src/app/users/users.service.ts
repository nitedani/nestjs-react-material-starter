import { Injectable } from '@nestjs/common';
import { Prisma, Provider, User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createToken(userId: string) {
    const token = randomBytes(16).toString('hex');
    return this.prismaService.confirmation.create({
      data: {
        userId: userId,
        token,
      },
    });
  }

  create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  async update(user: Partial<User>) {
    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: { ...user, updatedAt: new Date() },
    });
  }

  findToken(token: string) {
    return this.prismaService.confirmation.findUnique({
      where: {
        token,
      },
    });
  }

  findOneById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByProvider(
    provider: Provider,
    providerId: string,
  ): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        provider,
        providerId,
      },
    });
  }
}
