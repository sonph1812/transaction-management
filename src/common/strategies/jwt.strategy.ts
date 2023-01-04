import {
  Global,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { INVALID_TOKEN } from '../../messages/auth.message';
// import { PayloadJwt } from '../../modules/auth/auth.interface';

@Global()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  // async validate(
  //   // { iat, exp, uId }: PayloadJwt,
  //   done: (error: Error, user: any) => void,
  // ): Promise<boolean> {
  //   const timeDiff: number = exp - iat;
  //   if (timeDiff <= 0) {
  //     throw new UnauthorizedException(INVALID_TOKEN);
  //   }
  //   const role = uId.slice(6,)
  //
  //   const user: UserDocument = await this.userService.findOne( {email:role});
  //
  //   if (user) {
  //     done(null, user);
  //     return true;
  //   }
  //
  //   return false;
  // }
}
