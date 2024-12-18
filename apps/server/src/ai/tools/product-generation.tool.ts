import { Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { z } from 'zod';
import { AiConfigService } from '../services/ai-config.service';
import { ImageGenerationService } from '../services/image-generation.service';

@Injectable()
export class ProductGenerationTool {
  constructor(
    private aiConfig: AiConfigService,
    private imageService: ImageGenerationService,
  ) {}

  async generateBasicInfo({
    userPrompt,
    category,
  }: {
    userPrompt: string;
    category: string;
  }) {
    const { object } = await generateObject({
      model: this.aiConfig.getModel(),
      prompt: `Generate initial product concept based on: ${userPrompt}. Category: ${category}`,
      schema: z.object({
        name: z.string().describe('Product name'),
        description: z.string().describe('Detailed product description'),
        brand: z.string().describe('Brand name'),
        category: z.string(),
        price: z.number().describe('Retail price in USD'),
        countInStock: z.number().default(0),
        rating: z.number().default(0),
        numReviews: z.number().default(0),
        reviews: z.array(z.any()).default([]),
      }),
    });

    return object;
  }

  async generateProductImages({ productInfo }: { productInfo: any }) {
    const { object: imagePrompts } = await generateObject({
      model: this.aiConfig.getModel(),
      prompt: `Generate 4 consistent product image prompts with different angles for: ${JSON.stringify(productInfo)}`,
      schema: z.object({
        mainImage: z.string().describe('Main product shot prompt'),
        lifestyle: z.string().describe('Lifestyle usage shot prompt'),
        detail: z.string().describe('Detail/feature shot prompt'),
        packaging: z.string().describe('Product packaging shot prompt'),
      }),
    });

    const images = await Promise.all(
      Object.values(imagePrompts).map(prompt =>
        this.imageService.generateProductImage({ prompt }),
      ),
    );

    return { images };
  }

  async generateBrandAssets({
    brand,
    productInfo,
  }: {
    brand: string;
    productInfo: any;
  }) {
    const { object: logoPrompt } = await generateObject({
      model: this.aiConfig.getModel(),
      prompt: `Generate a logo prompt for brand: ${brand}, product type: ${productInfo.category}`,
      schema: z.object({
        prompt: z.string().describe('Logo generation prompt'),
        style: z.object({
          colors: z.array(z.string()),
          moodWords: z.array(z.string()),
          composition: z.string(),
        }),
      }),
    });

    const brandLogo = await this.imageService.generateProductImage({
      prompt: logoPrompt.prompt,
    });

    return { brandLogo };
  }

  async validateProduct(product: any) {
    const { object } = await generateObject({
      model: this.aiConfig.getModel(),
      prompt: `Validate product details: ${JSON.stringify(product)}`,
      schema: z.object({
        isValid: z.boolean(),
        missingFields: z.array(z.string()),
        suggestions: z.array(z.string()),
        marketFitScore: z.number().min(0).max(100),
        pricingFeedback: z.string(),
      }),
    });

    return object;
  }
}
