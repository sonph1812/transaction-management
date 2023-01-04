import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email:string

  @IsString()
  @IsDefined()
  @ApiProperty()
  password:string

}
