import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { UrlShortner } from './shortner.entity';
import { InjectModel } from '@nestjs/sequelize';
import normalizeUrl from 'normalize-url';
import { RedirectCounter } from '../redirectcounter/redirectcounter.entity';

@Injectable()
export class ShortnerService {

  constructor(
    @InjectModel(UrlShortner)
    private urlShortnerModel: typeof UrlShortner,
    @InjectModel(RedirectCounter)
    private redirectCounterModel: typeof RedirectCounter,
  ) { }

  async shortenUrl(originalUrl: string): Promise<{ shortCode: string, originalUrl: string }> {
    let shortCode: string;
    let retryCount = 0;

    try {
      while (retryCount < 5) {
        shortCode = this.generateShortCode();

        const existingUrl = await this.urlShortnerModel.findOne({
          where: { shortCode },
        });

        if (!existingUrl) {
          originalUrl = normalizeUrl(originalUrl);

          const urlData = this.getUrlData(originalUrl);

          const { hostname: hostName, protocol, pathname: pathName } = urlData;

          const searchParams = Object.fromEntries(urlData.searchParams.entries());

          await this.urlShortnerModel.create({
            originalUrl,
            shortCode,
            hostName,
            pathName,
            searchParams: JSON.stringify(searchParams),
            protocol
          });

          return {
            shortCode,
            originalUrl
          };
        }

        retryCount++;
      }

      throw new Error('Failed to generate a unique short URL');
    } catch (error) {
      Logger.error(error);
      throw new Error('An error occurred while shorten the URL');
    }
  }

  async resolveUrl(shortCode: string): Promise<string> {
    try {
      const urlEntry = await this.urlShortnerModel.findOne({
        where: { shortCode },
      });

      console.log(urlEntry,'edjwejjd');

      if (!urlEntry) {
        throw new NotFoundException('Short URL not found');
      }

      await this.redirectCounterModel.create({
        referenceId: urlEntry.id
      })

      return urlEntry.originalUrl;
    } catch (error) {
      Logger.error(error);
      throw new Error('An error occurred while resolving the URL');
    }
  }

  private generateShortCode(): string {
    const shortCode = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);
    return shortCode();
  }

  private getUrlData(originalUrl: string): URL {
    try {
      const url = new URL(originalUrl);

      return url;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Invalid URL');
    }
  }
}
