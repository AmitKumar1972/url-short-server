import { Module } from '@nestjs/common';
import { ShortnerService } from './shortner.service';
import { ShortnerController } from './shortner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlShortner } from './shortner.entity';
import { RedirectCounter } from '../redirectcounter/redirectcounter.entity';

@Module({
  imports: [SequelizeModule.forFeature([UrlShortner, RedirectCounter])],
  controllers: [ShortnerController],
  providers: [ShortnerService],
})
export class ShortnerModule {}
