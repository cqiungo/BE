// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadService } from './upload.service';
@Module({
  imports: [],
  exports: [UploadService],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryProvider],
})
export class UploadModule {}

