import { Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { SpotifyService } from '../spotify.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.spotifyService.getArtistById(params.id);
    return res;
  }

  @Post('/:id')
  async post(@Param() params) {
    const res = await this.dbManager.addArtist(params.id);
    console.log(res, 'created or not');
    return undefined;
  }
}
