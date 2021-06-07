import { Injectable } from '@nestjs/common';
import * as cuid from 'cuid';
import { Provider, User } from 'src/server/common/types/user';
import { DataStoreService } from '../database/datastore/datastore.service';
import { CreateUserDto } from './dto/create-user.dto';
import { randomBytes } from 'crypto';
@Injectable()
export class UsersService {
  constructor(private dataStore: DataStoreService) {}

  async createToken(userId: string) {
    const kind = 'confirmation';
    const token = randomBytes(16).toString('hex');
    const key = this.dataStore.key([kind, token]);
    const data = {
      userId,
      token,
    };
    await this.dataStore.save({
      key,
      data,
    });
    return data;
  }

  async create(user: CreateUserDto): Promise<User> {
    const kind = 'user';
    const id = cuid();
    const key = this.dataStore.key([kind, id]);
    const now = Date.now();
    const data = { ...user, id, createdAt: now, updatedAt: now };
    await this.dataStore.save({
      key,
      data,
    });
    return data;
  }

  async update(user: Partial<User>) {
    const kind = 'user';
    const key = this.dataStore.key([kind, user.id]);
    const now = Date.now();
    const data = { ...user, updatedAt: now };
    await this.dataStore.update({
      key,
      data,
    });
    return data;
  }

  async findToken(token: string) {
    const key = this.dataStore.key(['confirmation', token]);
    const [foundToken] = await this.dataStore.get(key);
    return foundToken;
  }

  async findOneById(id: string): Promise<User> {
    const key = this.dataStore.key(['user', id]);
    const [user] = await this.dataStore.get(key);
    console.log(user);
    return user;
  }

  async findOneByProvider(
    provider: Provider,
    providerId: string,
  ): Promise<User> {
    const query = this.dataStore
      .createQuery('user')
      .filter('provider', provider)
      .filter('providerId', providerId)
      .limit(1);

    const [user] = await this.dataStore.runQuery(query);
    return user.length && user[0];
  }
}
