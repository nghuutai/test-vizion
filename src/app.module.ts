/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnicalTestsModule } from './technical-tests/technical-tests.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DATABASE_CONNECTION}`, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(require('mongoose-paginate-v2'));
        return connection;
      },
      autoIndex: true,
    }),
    TechnicalTestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
