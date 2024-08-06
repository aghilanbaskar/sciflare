import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import Organization from 'src/models/organization.model';

@Injectable()
export class OrganizationService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return 'This action adds a new organization';
  }

  findAll() {
    return Organization.find({});
  }

  async findOne(id: string) {
    const organization = await Organization.findById(id);
    return organization.toJSON();
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await Organization.findById(id);
    organization.set({
      name: updateOrganizationDto.companyName,
    });
    await organization.save();
    return organization.toJSON();
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
