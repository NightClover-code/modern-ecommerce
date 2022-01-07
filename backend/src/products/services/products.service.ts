import { Injectable } from '@nestjs/common';
import products from 'src/data/products';

@Injectable()
export class ProductsService {
  findAll() {
    return products;
  }

  findOne(id: string) {
    const product = products.find(p => p._id === id);

    return product;
  }
}
