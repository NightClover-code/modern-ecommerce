import { Module } from '@nestjs/common';
import { ImageGenerationService } from './services/image-generation.service';
import { TextGenerationService } from './services/text-generation.service';
import { AiConfigService } from './services/ai-config.service';
import { ProductGenerationService } from './services/product-generation.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [
    ImageGenerationService,
    TextGenerationService,
    AiConfigService,
    ProductGenerationService,
  ],
  exports: [
    ImageGenerationService,
    TextGenerationService,
    ProductGenerationService,
    AiConfigService,
  ],
})
export class AiModule {}
