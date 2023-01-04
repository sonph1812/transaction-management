import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Voting-API Management, Please /api to Open SWAGGER API!';
  }
}
