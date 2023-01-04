import { ApiProperty } from "@nestjs/swagger";
import { ResultsMetadata } from "../../../dto/results-metadata";
import { User } from "../entity/user.entity";

export  class Users{
  @ApiProperty({type:[User]})
  data:User[]

  @ApiProperty()
  meta:ResultsMetadata
}
