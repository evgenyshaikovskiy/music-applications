import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { SpotifyService } from '../spotify.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.spotifyService.getAlbumById(params.id);
    return res;
  }

  @Post('/:id')
  async post(@Param() params) {
    const res = await this.dbManager.addAlbum(params.id);
    return res;
  }
}
