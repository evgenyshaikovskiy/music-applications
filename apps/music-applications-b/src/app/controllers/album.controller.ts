import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { Album } from '../models/album.model';
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

  @Post()
  async post(@Req() request) {
    const album: Album = request.body as unknown as Album;
    const adding = await this.dbManager.addAlbum(album);
    return undefined;
  }
}
