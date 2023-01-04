import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadJwt } from '../interfaces/payload-jwt.interface';

export const GetAuthPayload = () => {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as PayloadJwt;
  })();
};
