import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ConfigModule } from '@nestjs/config';
import { ShortnerModule } from './modules/shortner/shortner.module';
import { UrlShortner } from './modules/shortner/shortner.entity';
import { RedirectCounter } from './modules/redirectcounter/redirectcounter.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_DIALECT: Joi.string(),
        DATABASE_HOST: Joi.string(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        DATABASE_NAME: Joi.string(),
        PORT: Joi.number().default(3000),
        DOMAIN_URL: Joi.string().default('http://localhost:5000'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [UrlShortner, RedirectCounter, User],
      repositoryMode: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2d'
      },
    }),
    UserModule,
    ShortnerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
