import { PickType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends PickType(CreateOrganizationDto, [
  'companyName',
]) {}
