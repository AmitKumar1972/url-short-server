import { ShortnerService } from './shortner.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('url')
export class ShortnerController {
  constructor(private readonly shortnerService: ShortnerService) { }

  @Post('/shorten')
  async shortenUrl(@Body('url') url: string): Promise<{ shortUrl: string, originalUrl: string }> {
    const serverUrl: string | undefined = process.env.DOMAIN_URL;
    const { shortCode, originalUrl } = await this.shortnerService.shortenUrl(url);

    return {
      shortUrl: `${serverUrl}/${shortCode}`,
      originalUrl
    }
  }

  @Get('/:shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    const originalUrl = await this.shortnerService.resolveUrl(shortCode);

    return res.redirect(302, originalUrl);
  }
}
