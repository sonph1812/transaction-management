import { Module } from '@nestjs/common';
import { RefreshTokenService } from "./refresh-token.service";
import { RefreshToken } from "./entity/refresh-token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports:[
    TypeOrmModule.forFeature([RefreshToken])
  ],
  providers:[RefreshTokenService],
  exports:[RefreshTokenService, TypeOrmModule],


})
export class RefreshTokenModule {}
