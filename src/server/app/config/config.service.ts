import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get<T>(key: string): string {
    return process.env[key];
  }
}
