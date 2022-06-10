import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from './utils';

@Controller('')
export class AppController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: imageFileFilter,
    })
  )
  uploadFile(@UploadedFile() { filename, originalname }: Express.Multer.File) {
    const response = { filename, originalname };

    return response;
  }
}
