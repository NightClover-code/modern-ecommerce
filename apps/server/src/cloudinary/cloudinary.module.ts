import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './services/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
