import { Injectable } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import {
  ImageGenerationOptions,
  ImageGenerationResponse,
  SupportedImageModel,
} from '../interfaces/image-generation.interface';
import { CloudinaryService } from '@/cloudinary/services/cloudinary.service';

@Injectable()
export class ImageGenerationService {
  private defaultModel: SupportedImageModel = 'black-forest-labs/flux-schnell';

  constructor(
    private aiConfig: AiConfigService,
    private cloudinary: CloudinaryService,
  ) {}

  async generateProductImage(
    options: ImageGenerationOptions,
  ): Promise<ImageGenerationResponse> {
    try {
      const replicate = this.aiConfig.getReplicate();

      const output = await replicate.run(options.model || this.defaultModel, {
        input: {
          prompt: options.prompt,
          negative_prompt: options.negativePrompt,
          width: options.width || 1024,
          height: options.height || 1024,
          num_inference_steps: options.steps || 4,
          num_outputs: options.numOutputs || 1,
          seed: options.seed || Math.floor(Math.random() * 1000000),
          ...(options.sourceImage && {
            image: options.sourceImage,
            image_strength: options.imageStrength || 0.7,
          }),
        },
      });

      const urls: string[] = await Promise.all(
        // @ts-ignore
        output.map(async (item: Buffer, index: number) => {
          return this.cloudinary.uploadBuffer(item);
        }),
      );

      return {
        urls,
        metadata: {
          model: options.model || this.defaultModel,
          prompt: options.prompt,
          generationTime: Date.now(),
        },
      };
    } catch (error) {
      console.error('Error generating product image', error);
      throw error;
    }
  }
}
