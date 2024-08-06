import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  canAccessOrganization,
  canAccessUser,
} from 'src/auth/guards/organization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(new canAccessOrganization())
  @Roles(['admin'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(new canAccessOrganization())
  findAll(@Query() searchUserDto: SearchUserDto) {
    return this.usersService.findAll(searchUserDto);
  }

  @Get(':userId')
  @UseGuards(new canAccessUser())
  findOne(@Param('userId') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':userId')
  @UseGuards(new canAccessUser())
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(new canAccessUser())
  remove(@Param('userId') id: string) {
    return this.usersService.remove(id);
  }
}
