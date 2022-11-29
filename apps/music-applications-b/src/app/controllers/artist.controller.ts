import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { DatabaseManager } from '../db-manager.service';
import { Artist } from '../models/artist.model';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly appService: AppService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.appService.spotifyWebApi.getArtist(params.id);
    return res.body;
  }

  @Post()
  async post(@Req() request) {
    const artist: Artist = request.body as unknown as Artist;
    console.log(artist);
    return undefined;
  }
}
