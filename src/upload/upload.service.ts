// upload.service.ts
import type { Multer } from 'multer';
import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class UploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

async uploadImageToCloudinary(file: Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'nest_uploads' },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload failed: No result returned'));
        resolve(result);
      },
    );
    toStream(file.buffer).pipe(uploadStream);
  });
}
}
