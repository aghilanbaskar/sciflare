import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User, { userRoleEnum } from 'src/models/users.model';
import { SearchUserDto } from './dto/search-user.dto';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    try {
      let user = await User.findOne({
        organizationId: createUserDto.organizationId,
        email: createUserDto.email,
      });
      if (user) {
        if (user.deleted) {
          user.deleted = false;
          await user.save();
        } else {
          throw new BadRequestException('User already exists');
        }
      } else {
        user = new User({
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          phone: createUserDto.phone,
          organizationId: createUserDto.organizationId,
          password: createUserDto.password,
          role: createUserDto.role,
        });
        await user.save();
      }

      return user.toJSON();
    } catch (error) {
      if (error && error.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw error;
    }
  }

  findAll(searchUserDto: SearchUserDto) {
    const query: {
      organizationId: string;
      deleted: boolean;
      role?: userRoleEnum;
    } = {
      organizationId: searchUserDto.organizationId,
      deleted: false,
    };
    if (searchUserDto.role) {
      query.role = searchUserDto.role;
    }
    return User.find(query).skip(searchUserDto.skip).limit(searchUserDto.limit);
  }

  async findOne(id: string) {
    try {
      const user = await User.findById(id);
      if (!user || user.deleted) {
        throw new NotFoundException('User not found');
      }
      return user.toJSON();
    } catch (error) {
      if (
        error instanceof mongoose.Error.CastError ||
        error instanceof mongoose.Error.ValidationError ||
        error instanceof mongoose.Error.DocumentNotFoundError
      ) {
        throw new InternalServerErrorException('User not found');
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await User.findById(id);
      if (!user || user.deleted) {
        throw new NotFoundException('User not found');
      }
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.email = updateUserDto.email;
      user.phone = updateUserDto.phone;
      user.role = updateUserDto.role;
      await user.save();
      return user.toJSON();
    } catch (error) {
      if (error && error.code === 11000) {
        throw new BadRequestException('User email already exists');
      }
      throw new InternalServerErrorException('Error while updating user');
    }
  }

  async remove(id: string) {
    const user = await User.findById(id);
    if (user.isOwner) {
      throw new BadRequestException('Cannot delete owner');
    }
    if (!user || user.deleted) {
      throw new NotFoundException('User not found');
    }
    await user.delete();
    return {
      succeeded: true,
      message: 'User deleted successfully',
    };
  }
}
