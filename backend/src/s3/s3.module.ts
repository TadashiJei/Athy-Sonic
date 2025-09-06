import { Module } from '@nestjs/common';
import { ObjectsController } from './objects.controller';
import { BucketsController } from './buckets.controller';
import { StorageService } from './storage.service';

@Module({
  controllers: [ObjectsController, BucketsController],
  providers: [StorageService],
  exports: [StorageService],
})
export class S3Module {}
