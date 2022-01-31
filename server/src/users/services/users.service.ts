import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createMany(users: Partial<UserDocument>[]) {
    const createdUsers = await this.userModel.insertMany(users);

    return createdUsers;
  }

  async create(user: Partial<UserDocument>) {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findOne(email: string) {
    const user = this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('user not found.');

    return user;
  }

  async findById(id: string) {
    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException('user not found.');

    return user;
  }

  async findAll() {
    const users = this.userModel.find({});

    return users;
  }

  async deleteMany() {
    await this.userModel.deleteMany({});
  }

  async update(id: string, attrs: Partial<UserDocument>) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('user not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.name = attrs.name || user.name;
    user.email = attrs.email || user.email;

    if (attrs.password) {
      user.password = attrs.password;
    }

    const updatedUser = await user.save();

    return updatedUser;
  }
}
