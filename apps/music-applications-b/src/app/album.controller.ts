import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.appService.spotifyWebApi.getAlbum(params.id);
    return res.body;
  }

  @Post()
  async post(@Req() request) {
    console.log(request.body);
    return request;
  }
}
