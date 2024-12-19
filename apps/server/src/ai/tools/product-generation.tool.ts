import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { z } from 'zod';
import { AiConfigService } from '../services/ai-config.service';
import { ImageGenerationService } from '../services/image-generation.service';
import { ProductCreationStep } from '@apps/shared/types/agents';
import { ProductsService } from '@/products/services/products.service';

@Injectable()
export class ProductGenerationTool {
  constructor(
    private aiConfig: AiConfigService,
    private imageService: ImageGenerationService,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
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
    const basePrompt = `Professional product photography of a ${productInfo.brand} ${productInfo.name}, ${productInfo.category},
      premium product visualization, floating in space, light gray background (#F0F0F0),
      soft shadow beneath product, studio lighting, 8k resolution, photorealistic, ultra detailed`;

    const seed = Math.floor(Math.random() * 1000000);

    const angles = [
      {
        name: 'front',
        prompt: `${basePrompt}, straight front view, perfectly centered`,
      },
      {
        name: 'side',
        prompt: `${basePrompt}, perfect side profile view, showing product depth`,
      },
      {
        name: '45-degree',
        prompt: `${basePrompt}, 45-degree angle view showing front and side`,
      },
      {
        name: 'back',
        prompt: `${basePrompt}, straight back view showing ports and connections`,
      },
    ];

    const images = await Promise.all(
      angles.map(angle =>
        this.imageService.generateProductImage({
          prompt: angle.prompt,
          negativePrompt:
            'text, watermark, low quality, blurry, distorted, hands, people, accessories, busy background, pure white background',
          width: 1024,
          height: 1024,
          seed,
        }),
      ),
    );

    return {
      images: images.map((image, index) => ({
        url: image.urls[0],
      })),
    };
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

      const brandLogo = await this.imageService.generateProductImage({
        prompt: logoPrompt.prompt,
      });

      return { brandLogo: { url: brandLogo.urls[0] } };
    } catch (error) {
      console.error('Error generating brand assets', error);
      throw error;
    }
  }

  async validateProduct(product: any) {
    const productSchema = z.object({
      name: z.string().min(1, 'Product name is required'),
      description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
      brand: z.string().min(1, 'Brand name is required'),
      category: z.string().min(1, 'Category is required'),
      price: z.number().positive('Price must be positive'),
      countInStock: z.number().min(0, 'Stock cannot be negative'),
      images: z
        .array(z.string().url())
        .min(1, 'At least one product image is required'),
      brandLogo: z.string().url('Brand logo URL is required'),
    });

    const schemaValidation = productSchema.safeParse(product);

    const { object: aiValidation } = await generateObject({
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

    return {
      isValid: schemaValidation.success && aiValidation.isValid,
      missingFields: [
        ...(schemaValidation.success
          ? []
          : Object.keys(schemaValidation.error.formErrors.fieldErrors)),
        ...aiValidation.missingFields,
      ],
      suggestions: aiValidation.suggestions,
      marketFitScore: aiValidation.marketFitScore,
      pricingFeedback: aiValidation.pricingFeedback,
    };
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

  async saveProduct(product: {
    name: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    images: string[] | { url: string }[];
    brandLogo?: string | { url: string };
  }) {
    console.log('Received product data:', JSON.stringify(product, null, 2));

    const productSchema = z.object({
      name: z.string(),
      description: z.string(),
      brand: z.string(),
      category: z.string(),
      price: z.number().positive(),
      countInStock: z.number().min(0),
      images: z.array(z.string().url()),
      brandLogo: z.string().url().optional(),
    });

    try {
      const transformedData = {
        ...product,
        images: Array.isArray(product.images)
          ? product.images.map(img => (typeof img === 'string' ? img : img.url))
          : [],
        brandLogo:
          typeof product.brandLogo === 'string'
            ? product.brandLogo
            : product.brandLogo?.url,
      };

      console.log('Transforming product data:', transformedData);

      const validatedProduct = productSchema.parse(transformedData);
      const savedProduct = await this.productService.create(validatedProduct);

      return {
        success: true,
        productId: savedProduct._id.toString(),
        message: `Successfully saved ${savedProduct.name} to the database!`,
      };
    } catch (error: any) {
      console.error('Product validation/save error:', error);

      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Invalid product data',
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }

      console.error('Error saving product:', error);
      return {
        success: false,
        message: 'Failed to save product to database',
        error: error.message,
      };
    }
  }
}
