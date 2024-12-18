import { Module } from '@nestjs/common';
import { ImageGenerationService } from './services/image-generation.service';
import { TextGenerationService } from './services/text-generation.service';
import { AiConfigService } from './services/ai-config.service';
import { ProductGenerationService } from './services/product-generation.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { ProductGenerationTool } from './tools/product-generation.tool';

@Module({
  imports: [CloudinaryModule],
  providers: [
    ImageGenerationService,
    TextGenerationService,
    AiConfigService,
    ProductGenerationService,
    ProductGenerationTool,
  ],
  exports: [
    ImageGenerationService,
    TextGenerationService,
    ProductGenerationService,
    AiConfigService,
    ProductGenerationTool,
  ],
})
export class AiModule {}
