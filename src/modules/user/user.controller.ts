import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { FindUsersDto } from "./dto/find-user.dto";
import { Users } from "./model/users.model";
import { User } from "./entity/user.entity";


@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  async findAll(@Query() dto: FindUsersDto): Promise<Users> {
    return await this.userService.findAll(dto);
  }

  @Get(':id')
async findOne(@Param('id')id: number):Promise<User>{
    return await this.userService.findOne(id)
  }
}
