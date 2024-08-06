import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { canAccessOrganization } from 'src/auth/guards/organization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    throw new NotImplementedException();
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Get(':organizationId')
  @UseGuards(canAccessOrganization)
  findOne(@Param('organizationId') id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(':organizationId')
  @UseGuards(canAccessOrganization)
  @Roles(['admin'])
  update(
    @Param('organizationId') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':organizationId')
  remove(@Param('organizationId') id: string) {
    throw new NotImplementedException();
  }
}
