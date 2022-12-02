import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('network')
export class NetworkController {
  constructor(private readonly httpService: HttpService) {}

  @Get('comment/:commentText')
  async postComment(@Param() params) {
    console.log('received comment', params.commentText);

    return 'bebra';
  }
}
