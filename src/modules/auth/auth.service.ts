import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}
  async generateToken(userId: string, userName: string): Promise<string> {
    const payload = { sub: userId, username: userName };

    const token = sign(payload, 'amit', {
      expiresIn: '1h',
      algorithm: 'HS256',
      issuer: 'glue-auth',
    });

    return token;
  }
}
