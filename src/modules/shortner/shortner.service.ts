import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortnerService {
  getHello(): string {
    return 'Hello World!';
  }
}
