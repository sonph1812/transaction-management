import {  IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FindDto } from "../../../dto/find.dto";

export class FindUsersDto extends FindDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @IsOptional()
  searchQuery?: string;
}
