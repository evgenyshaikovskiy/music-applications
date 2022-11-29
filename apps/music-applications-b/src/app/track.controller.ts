import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('track')
export class TrackController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async get(@Param() params) {
    console.log(params);
    const result = await this.appService.spotifyWebApi.getTrack(params.id);
    return result.body;
  }

  @Post('/track')
  async post(@Req() request: Request) {
    console.log(request.body);

    return request;
  }
}
