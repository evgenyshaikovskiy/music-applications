import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { DatabaseManager } from '../db-manager.service';
import { Playlist } from '../models/playlist.model';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly appService: AppService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.appService.spotifyWebApi.getPlaylist(params.id);
    return res.body;
  }

  @Post()
  async post(@Req() request: Request) {
    const playlist: Playlist = request.body as unknown as Playlist;
    console.log(playlist);
    return undefined;
  }
}
