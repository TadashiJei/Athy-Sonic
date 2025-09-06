import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Head,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { StorageService } from './storage.service';

@Controller()
export class ObjectsController {
  constructor(private readonly storage: StorageService) {}

  @Put(':bucket/*key')
  async putObject(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Req() req: Request,
  ) {
    const body = (req.body as Buffer) ?? Buffer.alloc(0);
    const contentType = req.headers['content-type'] as string | undefined;
    const meta = this.storage.putObject(bucket, key, body, contentType);
    return {
      etag: meta.etag,
      versionId: null,
    };
  }

  @Get(':bucket/*key')
  async getObject(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Res() res: Response,
  ) {
    const { meta, body } = this.storage.getObject(bucket, key);
    res.setHeader('ETag', meta.etag);
    res.setHeader('Content-Type', meta.contentType ?? 'application/octet-stream');
    res.setHeader('Content-Length', meta.size.toString());
    res.status(200).send(body);
  }

  @Head(':bucket/*key')
  async headObject(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Res() res: Response,
  ) {
    const meta = this.storage.headObject(bucket, key);
    res.setHeader('ETag', meta.etag);
    res.setHeader('Content-Type', meta.contentType ?? 'application/octet-stream');
    res.setHeader('Content-Length', meta.size.toString());
    res.status(200).send();
  }

  @Delete(':bucket/*key')
  async deleteObject(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Query('uploadId') uploadId?: string,
    @Res() res?: Response,
  ) {
    if (uploadId) {
      this.storage.abortMultipart(uploadId);
      res?.status(204).send();
      return;
    }
    this.storage.deleteObject(bucket, key);
    res?.status(204).send();
  }

  @Post(':bucket/*key')
  async multipartOps(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Query('uploads') uploads?: string,
    @Query('uploadId') uploadId?: string,
    @Req() req?: Request,
  ) {
    if (uploads) {
      return this.storage.initiateMultipart(bucket, key);
    }
    if (uploadId) {
      const body = (req?.body ?? {}) as { parts?: Array<{ partNumber: number; etag: string }> };
      if (!body.parts || !Array.isArray(body.parts)) {
        throw new BadRequestException('Missing parts array');
      }
      const meta = this.storage.completeMultipart(uploadId, body.parts);
      return { etag: meta.etag, versionId: null };
    }
    throw new BadRequestException('Unsupported POST operation');
  }

  @Patch(':bucket/*key')
  async uploadPart(
    @Query('uploadId') uploadId: string,
    @Query('partNumber') partNumber: string,
    @Req() req: Request,
  ) {
    if (!uploadId || !partNumber) {
      throw new BadRequestException('uploadId and partNumber are required');
    }
    const pNum = Number(partNumber);
    if (!Number.isInteger(pNum) || pNum < 1) {
      throw new BadRequestException('partNumber must be a positive integer');
    }
    const body = (req.body as Buffer) ?? Buffer.alloc(0);
    const result = this.storage.uploadPart(uploadId, pNum, body);
    return result;
  }
}
