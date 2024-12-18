import { Injectable } from '@nestjs/common';
import { convertToCoreMessages, streamText } from 'ai';
import { z } from 'zod';
import { AiConfigService } from '../services/ai-config.service';
import { ProductGenerationTool } from '../tools/product-generation.tool';

interface ChatMessage {
  role: string;
  content: string;
}

@Injectable()
export class ProductExpertAgent {
  constructor(
    private aiConfig: AiConfigService,
    private productTool: ProductGenerationTool,
  ) {}

  async chat(messages: ChatMessage[]) {
    const coreMessages = convertToCoreMessages(messages).filter(
      message => message.content.length > 0,
    );

    const result = streamText({
      model: this.aiConfig.getModel(),
      system: `
        - You are a product development expert who helps users create and refine product ideas
        - Keep responses concise and focused on the next step
        - Guide users through the product development process step by step
        - Ask follow-up questions to gather necessary details
        - The optimal flow is:
          1. Generate basic product info from user description
          2. Generate product images
          3. Generate brand assets
          4. Validate final product
        - Allow users to iterate and refine at any step
        - Always show pricing in USD
      `,
      messages: coreMessages,
      tools: {
        generateBasicInfo: {
          description: 'Generate initial product concept from user description',
          parameters: z.object({
            userPrompt: z.string().describe('User product description'),
            category: z.string().describe('Product category'),
          }),
          execute: async ({ userPrompt, category }) => {
            return await this.productTool.generateBasicInfo({
              userPrompt,
              category,
            });
          },
        },
        generateProductImages: {
          description: 'Generate product images',
          parameters: z.object({
            productInfo: z.any().describe('Product information'),
          }),
          execute: async ({ productInfo }) => {
            return await this.productTool.generateProductImages({
              productInfo,
            });
          },
        },
        generateBrandAssets: {
          description: 'Generate brand logo and assets',
          parameters: z.object({
            brand: z.string(),
            productInfo: z.any(),
          }),
          execute: async ({ brand, productInfo }) => {
            return await this.productTool.generateBrandAssets({
              brand,
              productInfo,
            });
          },
        },
        validateProduct: {
          description: 'Validate product details and completeness',
          parameters: z.object({
            product: z.any(),
          }),
          execute: async ({ product }) => {
            return await this.productTool.validateProduct(product);
          },
        },
      },
    });

    return result;
  }
}
