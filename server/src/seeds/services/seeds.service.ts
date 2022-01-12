import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ProductsService } from 'src/products/services/products.service';
import { UsersService } from 'src/users/services/users.service';
import { products } from 'src/utils/data/products';
import { users } from 'src/utils/data/users';

@Injectable()
export class SeedsService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  @Command({ command: 'create:data', describe: 'creates data' })
  async create() {
    await this.productsService.deleteMany();
    await this.usersService.deleteMany();

    const createdUsers = await this.usersService.createMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(p => ({ ...p, user: adminUser }));

    await this.productsService.createMany(sampleProducts);

    console.log('Data imported!');
  }

  @Command({ command: 'destroy:data', describe: 'destroys data' })
  async destroy() {
    await this.productsService.deleteMany();
    await this.usersService.deleteMany();

    console.log('Data destroyed!');
  }
}
