import { Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { z } from 'zod';
import { AiConfigService } from '../services/ai-config.service';
import { ImageGenerationService } from '../services/image-generation.service';
import { ProductCreationStep } from '@apps/shared/types/agents';

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
    try {
      const { object } = await generateObject({
        model: this.aiConfig.getModel(),
        prompt: `Generate initial product concept based on: ${userPrompt}. Category: ${category}`,
        schema: z.object({
          name: z.string().describe('Product name'),
          description: z.string().describe('Detailed product description'),
          brand: z.string().describe('Brand name'),
          category: z.string(),
          price: z.number().describe('Retail price in USD'),
          countInStock: z.number().describe('User-specified inventory count'),
          userApproved: z.boolean().default(false),
          userFeedback: z.string().optional(),
          needsUserInput: z.array(z.string()).default(['countInStock']),
        }),
      });

      return object;
    } catch (error) {
      console.error('Error generating basic info', error);
      throw error;
    }
  }

  async generateProductImages({ productInfo }: { productInfo: any }) {
    try {
      console.log('Generating product images for ', productInfo);

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
    } catch (error) {
      console.error('Error generating product images', error);
      throw error;
    }
  }

  async generateBrandAssets({
    brand,
    productInfo,
  }: {
    brand: string;
    productInfo: any;
  }) {
    try {
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

      console.log('Logo prompt', logoPrompt);
      // const brandLogo = await this.imageService.generateProductImage({
      //   prompt: logoPrompt.prompt,
      // });

      // return { brandLogo };
    } catch (error) {
      console.error('Error generating brand assets', error);
      throw error;
    }
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

  async handleUserApproval({
    productInfo,
    userFeedback,
    step,
  }: {
    productInfo: any;
    userFeedback: string;
    step: ProductCreationStep;
  }) {
    const { object } = await generateObject({
      model: this.aiConfig.getModel(),
      prompt: `Process user feedback: ${userFeedback} for step: ${step}`,
      schema: z.object({
        approved: z.boolean(),
        updatedFields: z.record(z.any()).optional(),
        nextAction: z.enum(['proceed', 'modify', 'restart']),
        message: z.string(),
      }),
    });

    return object;
  }
}
