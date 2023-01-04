import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
  ) {
  }

  @Post('/login')
  async login(@Body() loginDto:LoginDto){
    return  this.authService.login(loginDto)
  }

  @Post('/register')
  async register(@Body()payload:CreateUserDto){
    return  await this.authService.register(payload)
  }

  @Post('/logout')
  async logout(@Body()userId:number){
    return  await this.authService.logout(userId)
  }



}

