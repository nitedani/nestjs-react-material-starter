import { Provider } from '@prisma/client';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name?: string;
  password?: string;
}
