import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { RefreshToken } from "./entity/refresh-token.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly rtRepo:Repository<RefreshToken>) {
  }
  async revoke (useId:number){
    const deleteRT = await  this.rtRepo.query(`delete from "refresh-token" where "userId" = ${useId}`)
    return   deleteRT
  }

  async create(payload: { refreshToken: string; userId: number; expiredTime: number }): Promise<RefreshToken> {

    const user = await this.rtRepo.save(payload)

    return user

}
}
