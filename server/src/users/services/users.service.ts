import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createMany(users: User[]) {
    return await this.userModel.insertMany(users);
  }

  async deleteMany() {
    await this.userModel.deleteMany({});
  }
}
