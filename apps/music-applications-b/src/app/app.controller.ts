import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async getData(@Query() query) {
    const res = await this.appService.getData(query);
    return res;
  }
}
