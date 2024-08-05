import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignUpDto extends OmitType(CreateUserDto, [
  'organizationId',
  'role',
] as const) {
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;
}
