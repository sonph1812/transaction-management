import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";

@Module({
  imports:[UserModule,RefreshTokenModule],
  providers: [AuthService],
  controllers: [AuthController,],

})
export class AuthModule {}
