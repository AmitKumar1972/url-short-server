import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
