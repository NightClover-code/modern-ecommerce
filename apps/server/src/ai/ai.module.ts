import { Module, forwardRef } from '@nestjs/common';
import { ImageGenerationService } from './services/image-generation.service';
import { TextGenerationService } from './services/text-generation.service';
import { AiConfigService } from './services/ai-config.service';
import { ProductGenerationService } from './services/product-generation.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { ProductGenerationTool } from './tools/product-generation.tool';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [CloudinaryModule, forwardRef(() => ProductsModule)],
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
