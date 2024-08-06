import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { userRoleEnum } from 'src/models/users.model';

export class SearchUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly organizationId: string;

  @IsEnum(userRoleEnum)
  @IsOptional()
  readonly role: userRoleEnum;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Max(100)
  readonly limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly skip: number = 0;
}
