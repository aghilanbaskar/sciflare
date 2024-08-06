import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { userRoleEnum } from 'src/models/users.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(350)
  readonly email: string;

  @IsPhoneNumber()
  @IsOptional()
  @MaxLength(15)
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly organizationId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
  })
  readonly password: string;

  @IsEnum(userRoleEnum)
  @IsOptional()
  readonly role: userRoleEnum = userRoleEnum.USER;
}
