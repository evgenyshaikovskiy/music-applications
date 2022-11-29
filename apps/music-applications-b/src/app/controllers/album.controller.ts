import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { DatabaseManager } from '../db-manager.service';
import { Album } from '../models/album.model';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly appService: AppService,
    private readonly dbManager: DatabaseManager
  ) {}

  @Get('/:id')
  async get(@Param() params) {
    const res = await this.appService.spotifyWebApi.getAlbum(params.id);
    return res.body;
  }

  @Post()
  async post(@Req() request) {
    const album: Album = request.body as unknown as Album;
    console.log(album, 'here');
    return undefined;
  }
}
