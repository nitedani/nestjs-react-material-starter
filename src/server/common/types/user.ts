export type Provider = 'google' | 'local';

export class User {
  id: string;
  provider: Provider;
  providerId: string;
  username: string;
  name?: string;
  createdAt: number;
  updatedAt: number;
  password?: string;
  isVerified?: boolean;
}
