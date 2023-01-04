import { ExecutionContext, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { INVALID_TOKEN, NO_TOKEN_HEADER } from '../../messages/auth.message';
import { ErrException } from '../../messages/exception.message';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   * Handle error code if canActivate return false
   *
   * @param {*} errror null
   * @param {*} user
   * @param {*} info | TokenExpiredError | JsonWebTokenError
   * @returns
   * @memberof RolesGuard
   */
  handleRequest(error, user, info) {
    if (info?.message === ErrException.NO_AUTH_TOKEN) {
      throw new UnauthorizedException(NO_TOKEN_HEADER);
    }

    if (error || !user) {
      throw new NotAcceptableException(INVALID_TOKEN);
    }

    return user;
  }
}
