import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';

@Injectable()
export class AppService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    console.log('AppService - Attempting upload for file:', {
      mimetype: file.mimetype,
      size: file.size,
    });

    const result = await this.cloudinary.uploadImage(file).catch(err => {
      console.log('Cloudinary upload failed:', err);
      throw new BadRequestException('Invalid file type.');
    });

    return result.secure_url;
  }
}
