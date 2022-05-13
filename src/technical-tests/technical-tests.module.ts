import { Module } from '@nestjs/common';
import { TechnicalTestsService } from './technical-tests.service';
import { TechnicalTestsController } from './technical-tests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TechnicalTest,
  TechnicalTestSchema,
} from './schema/technical-test.schema';
import { UploadService } from 'src/upload-file/upload-file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TechnicalTest.name,
        schema: TechnicalTestSchema,
      },
    ]),
  ],
  controllers: [TechnicalTestsController],
  providers: [TechnicalTestsService, UploadService],
})
export class TechnicalTestsModule {}
