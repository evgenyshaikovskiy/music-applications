import { Controller, Get, Param } from '@nestjs/common';

@Controller('network')
export class NetworkController {
  @Get('comment/:commentText')
  async postComment(@Param() params) {
    console.log('received comment', params.commentText);

    return 'bebra';
  }
}
