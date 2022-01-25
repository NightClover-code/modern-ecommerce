import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createMany(users: UserDocument[]) {
    const createdUsers = await this.userModel.insertMany(users);

    return createdUsers;
  }

  async create(user: Partial<UserDocument>) {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findOne(email: string) {
    const user = this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findById(id: string) {
    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findAll() {
    const users = this.userModel.find({});

    return users;
  }

  async deleteMany() {
    await this.userModel.deleteMany({});
  }
}
