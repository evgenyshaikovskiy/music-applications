import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DatabaseManager } from '../db-manager.service';
import { Artist } from '../models/artist.model';
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

  @Post()
  async post(@Req() request) {
    const artist: Artist = request.body as unknown as Artist;
    // const result = this.dbManager.addArtist(artist);
    return undefined;
  }
}
