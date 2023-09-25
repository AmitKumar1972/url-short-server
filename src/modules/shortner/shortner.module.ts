import { Module } from '@nestjs/common';
import { ShortnerService } from './shortner.service';
import { ShortnerController } from './shortner.controller';

@Module({
  imports: [],
  controllers: [ShortnerController],
  providers: [ShortnerService],
})
export class AppModule {}
