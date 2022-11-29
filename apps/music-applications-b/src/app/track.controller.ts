import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Track } from './models/track.model';

@Controller('track')
export class TrackController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async get(@Param() params) {
    console.log(params);
    const result = await this.appService.spotifyWebApi.getTrack(params.id);
    return result.body;
  }

  @Post()
  async post(@Req() request: Request) {
    const track: Track = request.body as unknown as Track;
    console.log(track);
    return undefined;
  }
}
