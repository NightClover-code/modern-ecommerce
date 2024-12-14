import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ProductDto } from '../dtos/product.dto';
import { ReviewDto } from '../dtos/review.dto';
import { ProductsService } from '../services/products.service';
import { UserDocument } from '@/users/schemas/user.schema';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '@/app/services/app.service';
// import { testProductImageGeneration } from '../../utils/seed-data';
import { ProductGenerationService } from '@/ai/services/product-generation.service';
import { ProductExpertAgent } from '@/ai/agents/product-expert.agent';
import { AgentState } from '@/ai/interfaces/agents';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private appService: AppService,
    private productGenerationService: ProductGenerationService,
    private productExpertAgent: ProductExpertAgent,
  ) {}

  @Get()
  getProducts(
    @Query('keyword') keyword: string,
    @Query('pageId') pageId: string,
  ) {
    return this.productsService.findMany(keyword, pageId);
  }

  @Get('topRated')
  getTopRatedProducts() {
    return this.productsService.findTopRated();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createProduct(
    @Body() productData: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.appService.uploadImageToCloudinary(file);
    return this.productsService.create({ ...productData, image: imageUrl });
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productsService.update(id, product);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/review')
  createReview(
    @Param('id') id: string,
    @Body() { rating, comment }: ReviewDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.productsService.createReview(id, user, rating, comment);
  }

  @Post('seed')
  // @UseGuards(AdminGuard)
  async seedProducts() {
    // Clear existing products first
    // await this.productsService.deleteMany();

    // Generate 3 products
    await testProductImageGeneration();

    // Create the products in the database
    // const createdProducts = await this.productsService.createMany(products);

    // return {
    //   message: 'Products seeded successfully',
    //   // count: createdProducts.length,
    //   // products: createdProducts,
    // };
  }

  @Post('test-image')
  async testImageGeneration() {
    const name = 'Sandals';
    const category = 'Footwear';
    const brand = 'Nike';

    try {
      const prompt = `Professional product photography of a ${brand} ${name}, ${category}, 
        sleek modern design, premium build quality, minimalist aesthetic, 
        on pure white background, studio lighting setup, high-end commercial photography, 
        8k resolution, photorealistic, ultra detailed, product catalog style`;

      const imageUrls =
        await this.productGenerationService.generateProductViews(prompt);

      return { success: true, imageUrls };
    } catch (error) {
      console.error('Error generating product images:', error);
      return { success: false, error: error.message };
    }
  }

  @Post('generate')
  // @UseGuards(AdminGuard)
  async generateProduct(@Body() { prompt }: { prompt: string }) {
    try {
      const generatedProduct =
        await this.productGenerationService.generateProduct(prompt);

      const savedProduct = await this.productsService.create(generatedProduct);

      return {
        success: true,
        product: savedProduct,
      };
    } catch (error) {
      console.error('Error generating product:', error);
      return { success: false, error: error.message };
    }
  }

  @Post('agent/test')
  async testProductAgent(@Body() { prompt }: { prompt: string }) {
    try {
      const initialState: AgentState = {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        status: 'thinking',
        context: {
          currentStep: 'brand', // Start with brand validation
        },
      };

      const action = await this.productExpertAgent.execute(initialState);

      return {
        success: true,
        action,
        product: action.payload,
      };
    } catch (error) {
      console.error('Product agent error:', error);
      return { success: false, error: error.message };
    }
  }
}
