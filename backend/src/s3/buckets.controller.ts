import { Controller, Get, Param, Query } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller()
export class BucketsController {
  constructor(private readonly storage: StorageService) {}

  @Get(':bucket')
  async listObjects(
    @Param('bucket') bucket: string,
    @Query('prefix') prefix?: string,
    @Query('continuation-token') continuationToken?: string,
  ) {
    // continuation-token is ignored in the in-memory implementation
    return this.storage.listObjects(bucket, prefix);
  }
}
