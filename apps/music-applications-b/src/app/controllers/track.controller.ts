import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { Track } from '../models/track.model';
import { SpotifyService } from '../spotify.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    console.log(params);
    const result = await this.spotifyService.getTrackById(params.id);
    return result;
  }

  @Post()
  async post(@Req() request: Request) {
    const track: Track = request.body as unknown as Track;
    console.log(track);
    return undefined;
  }
}
