import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { SpotifyService } from '../spotify.service';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.spotifyService.getPlaylistById(params.id);
    return res;
  }

  @Post('/:id')
  async post(@Param() params) {
    console.log(params.id);
    return undefined;
  }
}
