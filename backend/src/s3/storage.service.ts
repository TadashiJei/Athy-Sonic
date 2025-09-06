import { Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';

export interface StoredObjectMeta {
  bucket: string;
  key: string;
  etag: string;
  size: number;
  contentType?: string;
  lastModified: Date;
}

interface MultipartState {
  bucket: string;
  key: string;
  parts: Map<number, { body: Buffer; etag: string }>;
}

@Injectable()
export class StorageService {
  private objects = new Map<string, { meta: StoredObjectMeta; body: Buffer }>();
  private uploads = new Map<string, MultipartState>();

  private objKey(bucket: string, key: string) {
    return `${bucket}\u0000${key}`;
  }

  private md5(buffer: Buffer): string {
    return createHash('md5').update(buffer).digest('hex');
  }

  putObject(bucket: string, key: string, body: Buffer, contentType?: string): StoredObjectMeta {
    const etag = this.md5(body);
    const meta: StoredObjectMeta = {
      bucket,
      key,
      etag,
      size: body.length,
      contentType,
      lastModified: new Date(),
    };
    this.objects.set(this.objKey(bucket, key), { meta, body });
    return meta;
  }

  getObject(bucket: string, key: string): { meta: StoredObjectMeta; body: Buffer } {
    const obj = this.objects.get(this.objKey(bucket, key));
    if (!obj) {
      throw new NotFoundException('Object not found');
    }
    return obj;
  }

  headObject(bucket: string, key: string): StoredObjectMeta {
    const obj = this.objects.get(this.objKey(bucket, key));
    if (!obj) {
      throw new NotFoundException('Object not found');
    }
    return obj.meta;
  }

  deleteObject(bucket: string, key: string): void {
    this.objects.delete(this.objKey(bucket, key));
  }

  listObjects(bucket: string, prefix?: string) {
    const items: StoredObjectMeta[] = [];
    for (const { meta } of this.objects.values()) {
      if (meta.bucket !== bucket) continue;
      if (prefix && !meta.key.startsWith(prefix)) continue;
      items.push(meta);
    }
    return { bucket, items, isTruncated: false, nextContinuationToken: null as string | null };
  }

  initiateMultipart(bucket: string, key: string): { uploadId: string; bucket: string; key: string } {
    const uploadId = randomUUID();
    this.uploads.set(uploadId, { bucket, key, parts: new Map() });
    return { uploadId, bucket, key };
  }

  uploadPart(uploadId: string, partNumber: number, body: Buffer): { etag: string; partNumber: number } {
    const state = this.uploads.get(uploadId);
    if (!state) throw new NotFoundException('Upload not found');
    const etag = this.md5(body);
    state.parts.set(partNumber, { body, etag });
    return { etag, partNumber };
  }

  completeMultipart(uploadId: string, parts: Array<{ partNumber: number; etag: string }>): StoredObjectMeta {
    const state = this.uploads.get(uploadId);
    if (!state) throw new NotFoundException('Upload not found');
    // Concatenate parts in order of partNumber (validate etags if provided)
    const ordered = [...state.parts.entries()].sort((a, b) => a[0] - b[0]);
    const buffers: Buffer[] = [];
    for (const [num, part] of ordered) {
      const provided = parts.find((p) => p.partNumber === num);
      if (provided && provided.etag !== part.etag) {
        throw new Error(`ETag mismatch for part ${num}`);
      }
      buffers.push(part.body);
    }
    const body = Buffer.concat(buffers);
    const meta = this.putObject(state.bucket, state.key, body);
    this.uploads.delete(uploadId);
    return meta;
  }

  abortMultipart(uploadId: string): void {
    this.uploads.delete(uploadId);
  }
}
