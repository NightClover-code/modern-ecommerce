import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { UsersService } from 'src/users/services/users.service';
import { products } from 'src/utils/products';
import { users } from 'src/utils/users';

@Injectable()
export class SeedsService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  async create() {
    await this.productsService.deleteMany();
    await this.usersService.deleteMany();

    const createdUsers = await this.usersService.createMany(users as any);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(p => ({ ...p, user: adminUser }));

    await this.productsService.createMany(sampleProducts as any);

    console.log('Data imported!');
  }

  async destroy() {
    await this.productsService.deleteMany();
    await this.usersService.deleteMany();

    console.log('Data destroyed!');
  }
}
