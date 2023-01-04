import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // @IsDefined()
  @ApiProperty()
  readonly firstname: string;

  // @IsDefined()
  @ApiProperty()
  readonly lastname: string;

  @IsEmail()
  @IsDefined()
  @ApiProperty()
  readonly email: string;

  @IsDefined()
  @ApiProperty()
  readonly password: string;
}
