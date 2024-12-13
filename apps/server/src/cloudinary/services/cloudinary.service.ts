import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      console.log('Cloudinary upload - File details:', {
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer ? 'exists' : 'missing',
      });

      const upload = v2.uploader.upload_stream(
        { folder: 'modern-commerce' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result as any);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
