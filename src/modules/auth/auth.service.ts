import { HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import { USER_EXISTED, USER_NOT_FOUND, WRONG_CREDENTIALS } from "../../messages/auth.message";
import { comparePassword, encrypt3DES, hashPassword } from "../../util/crypto";
import { User } from "../user/entity/user.entity";
import { PayloadJwt } from "../../common/interfaces/payload-jwt.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
  jwtSecret: string;
  salt:string

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rfToken: RefreshTokenService,

  ) {
    this.jwtSecret =configService.get('jwt.secret');
    this.salt =configService.get('salt')
  }


  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByField(loginDto.email, "email");
    if (!user) throw new NotAcceptableException(USER_NOT_FOUND);
    const  userId = user.id
   const out = await  this.rfToken.revoke(userId)
    const token = await this.generateToken(user)
    const expiredTime = dayjs().add(30,'day').unix()
    await this.rfToken.create({
      refreshToken:token.refreshToken,
      userId,
      expiredTime,
    })

    const password = await comparePassword(loginDto.password, user.password);
    if (!password) throw new UnauthorizedException(WRONG_CREDENTIALS);

    return token
  }


  async generateToken(user: User): Promise<{ token: string, refreshToken: string }> {
      const uId = user.email;
      const data = JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password
      });

      const encryptData = encrypt3DES(data, uId);

      const payload
  :
    PayloadJwt = {
      uId,
      data: encryptData
    };

    const token: string = this.jwtService.sign(payload);
    const refreshToken: string = this.jwtService.sign(payload,
      {
        secret: this.configService.get("jwt.rt_secret"),
        expiresIn: this.configService.get("jwt.expired_in")
      });
    return {
      token,
      refreshToken
    };

  }

  async register(payload: CreateUserDto) {
    const nUser = await this.userService.create(payload)
  }

  async logout(userId:number){
    return   await  this.rfToken.revoke(userId)
  }
}
