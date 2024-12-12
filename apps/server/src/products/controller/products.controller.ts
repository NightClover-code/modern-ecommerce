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

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private appService: AppService,
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
  @UseInterceptors(FileInterceptor('image'))
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
}
