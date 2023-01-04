import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";

import { DatabaseModule } from "./modules/database/database.module";
import { HTTPModule } from "./modules/http/http.service";
import { JWTModule } from "./modules/jwt/jwt.service";
import { JwtStrategy } from "./common/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RefreshTokenModule } from "./modules/refresh-token/refresh-token.module";

@Module({
  imports:  [
    ConfigModule.forRoot({
    envFilePath: `.env`,
    isGlobal: true,
    load: [configuration]
  }),
    JWTModule,
    UserModule,
    RefreshTokenModule,
    DatabaseModule,
    AuthModule,
    HTTPModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})

export class AppModule {}
