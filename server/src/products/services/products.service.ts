import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async findMany() {
    const products = await this.productModel.find({});

    if (!products.length) throw new NotFoundException('No products found.');

    return products;
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('No product with given ID.');

    return product;
  }

  async createMany(products: Product[]) {
    const createdProducts = await this.productModel.insertMany(products);

    return createdProducts;
  }

  async deleteMany() {
    await this.productModel.deleteMany({});
  }
}
