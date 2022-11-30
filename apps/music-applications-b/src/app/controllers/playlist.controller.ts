import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { Playlist } from '../models/playlist.model';
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

  @Post()
  async post(@Req() request: Request) {
    const playlist: Playlist = request.body as unknown as Playlist;
    console.log(playlist);
    return undefined;
  }
}
