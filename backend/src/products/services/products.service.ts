import { Injectable } from '@nestjs/common';
import products from 'src/data/products';

@Injectable()
export class ProductsService {
  findAll() {
    return JSON.stringify(products);
  }
}
