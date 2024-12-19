import { Injectable } from '@nestjs/common';
import { convertToCoreMessages, Message, streamText } from 'ai';
import { z } from 'zod';
import { AiConfigService } from '../services/ai-config.service';
import { ProductGenerationTool } from '../tools/product-generation.tool';

@Injectable()
export class ProductExpertAgent {
  constructor(
    private aiConfig: AiConfigService,
    private productTool: ProductGenerationTool,
  ) {}

  async chat(messages: Message[]) {
    const coreMessages = convertToCoreMessages(messages).filter(
      message => message.content.length > 0,
    );

    const systemPrompt = `
      You are a product development expert who helps users create and refine product ideas.

      Follow this interactive process:
      1. When generating basic product info:
        - Ask user for initial product idea
        - Generate draft product details
        - Ask for approval and modifications
        - Get specific inventory count from user
        - Only proceed when user approves

      2. When generating product images:
        - Show image generation prompts
        - Ask for approval before generating
        - Allow user to modify style/angles

      3. When generating brand assets:
        - Propose brand identity elements
        - Get user feedback on style
        - Allow iterations on design

      4. When validating final product:
        - Show complete product summary
        - Get final user approval
        - Make suggested improvements

      Always ask for explicit user confirmation before proceeding to next step.
      Use markdown formatting for all responses.
      `;

    const result = streamText({
      model: this.aiConfig.getModel(),
      system: systemPrompt,
      messages: coreMessages,
      tools: {
        generateBasicInfo: {
          description: 'Generate initial product concept from user description',
          parameters: z.object({
            userPrompt: z.string().describe('User product description'),
            category: z.string().describe('Product category'),
          }),
          execute: async ({ userPrompt, category }) => {
            const result = await this.productTool.generateBasicInfo({
              userPrompt,
              category,
            });

            return {
              ...result,
              message: `
                        ### Generated Product Details
                        - **Name:** ${result.name}
                        - **Brand:** ${result.brand}
                        - **Category:** ${result.category}
                        - **Price:** $${result.price}

                        ${result.description}


                        > Please review these details. Would you like to:
                        1. Approve and specify inventory count
                        2. Modify any details
                        3. Start over with a different concept

                        What would you like to do?`,
            };
          },
        },
        handleApproval: {
          description: 'Process user approval and feedback',
          parameters: z.object({
            productInfo: z.any(),
            userFeedback: z.string(),
            step: z.enum(['basic-info', 'details', 'images', 'review']),
          }),
          execute: async ({ productInfo, userFeedback, step }) => {
            // Check if userFeedback contains a number (stock quantity)
            const stockMatch = userFeedback.match(/\d+/);
            if (stockMatch) {
              const stockQuantity = parseInt(stockMatch[0], 10);
              return {
                approved: true,
                canProgress: true, // Allow progress once we have stock
                message: `Perfect! I've set the inventory count to ${stockQuantity} units. Let's move on to generating product images.`,
                productInfo: {
                  ...productInfo,
                  countInStock: stockQuantity,
                },
              };
            }

            const result = await this.productTool.handleUserApproval({
              productInfo,
              userFeedback,
              step,
            });

            // Only ask for inventory if approved and we don't have it yet
            if (result.approved && !productInfo.countInStock) {
              return {
                approved: true,
                canProgress: false,
                message: `Great! Since you approved the product details, could you please specify the inventory count for the ${productInfo.name} product?

> For example: "Set initial stock to 100 units" or "Start with 50 in stock"`,
              };
            }

            return result;
          },
        },
        generateProductImages: {
          description: 'Generate product images',
          parameters: z.object({
            productInfo: z.any().describe('Product information'),
          }),
          execute: async ({ productInfo }) => {
            const result = await this.productTool.generateProductImages({
              productInfo,
            });

            return result;
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
      maxSteps: 5,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'stream-text',
      },
    });

    return result;
  }
}