import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check app',
  })
  @ApiOkResponse({ description: 'Hello World!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
