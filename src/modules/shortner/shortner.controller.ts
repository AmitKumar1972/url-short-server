import { ShortnerService } from './shortner.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ShortnerController {
  constructor(private readonly shortnerService: ShortnerService) {}

  @Get()
  getHello(): string {
    return this.shortnerService.getHello();
  }
}
