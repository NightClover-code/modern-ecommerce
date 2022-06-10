import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { encryptPassword } from 'src/utils';

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
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();

    return users;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    await user.remove();
  }

  async update(
    id: string,
    attrs: Partial<UserDocument>
  ): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.name = attrs.name || user.name;
    user.email = attrs.email || user.email;

    if (attrs.password) {
      user.password = await encryptPassword(attrs.password);
    }

    const updatedUser = await user.save();

    return updatedUser;
  }

  async adminUpdate(id: string, attrs: Partial<UserDocument>) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.name = attrs.name || user.name;
    user.email = attrs.email || user.email;
    user.isAdmin = attrs.isAdmin !== undefined && attrs.isAdmin;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async deleteMany(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
