import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createMany(users: Partial<UserDocument>[]): Promise<UserDocument[]> {
    const createdUsers = await this.userModel.insertMany(users);

    return createdUsers;
  }

  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findOne(email: string): Promise<UserDocument> {
    const user = this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('user not found.');

    return user;
  }

  async findById(id: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException('user not found.');

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    const users = this.userModel.find({});

    return users;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException('user not found.');

    await user.deleteOne();
  }

  async deleteMany(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  async update(
    id: string,
    attrs: Partial<UserDocument>
  ): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

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
