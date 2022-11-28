import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async getData(@Query() query) {
    const res = await this.appService.getData(query);
    return res;
  }

  @Get('web-search')
  async getWebData(@Query() query) {
    const res = await this.appService.getWebData(query);
    return res;
  }

  @Get('track/:id')
  async getTrack(@Param() params) {
    console.log(params);
    const result = await this.appService.spotifyWebApi.getTrack(params.id);
    return result.body;
  }

  @Get('playlist/:id')
  async getPlaylist(@Param() params) {
    const res = await this.appService.spotifyWebApi.getPlaylist(params.id);
    return res.body;
  }

  // could be redunant
  @Get('playlist-tracks')
  async getPlaylistTracks(@Param() params) {
    const res = await this.appService.spotifyWebApi.getPlaylistTracks(
      params.id
    );
    return res.body.items;
  }

  @Get('artist/:id')
  async getArtist(@Param() params) {
    const res = await this.appService.spotifyWebApi.getArtist(params.id);
    return res.body;
  }

  @Get('album/:id')
  async getAlbum(@Param() params) {
    const res = await this.appService.spotifyWebApi.getAlbum(params.id);
    return res.body;
  }

  @Get('albums-tracks')
  async getAlbumTracks(@Param() params) {
    const res = await this.appService.spotifyWebApi.getAlbumTracks(params.id);
    return res.body;
  }

  @Get('pause')
  async pause() {
    const res = await this.appService.spotifyWebApi.pause();
    return res;
  }

  @Get('play')
  async play() {
    const res = await this.appService.spotifyWebApi.play();
    return res;
  }

  @Get('login')
  async loginToSpotify(@Response() response) {
    response.redirect(
      this.appService.spotifyWebApi.createAuthorizeURL(
        this.appService.scopes,
        'some-state-of-my-choice'
      )
    );
  }

  @Get('callback')
  async callback(@Request() request, @Response() response) {
    const error = request.query.error;
    const code = request.query.code;
    // const state = request.query.state;

    if (error) {
      console.log('Callback error: ', error);
      return error;
    }

    this.appService.spotifyWebApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        // set up guard to monitor expiring token

        this.appService.spotifyWebApi.setAccessToken(access_token);
        this.appService.spotifyWebApi.setRefreshToken(refresh_token);

        response.send('Success, close this window now');

        setInterval(async () => {
          const data = await this.appService.spotifyWebApi.refreshAccessToken();
          const access_token = data.body['access_token'];
          this.appService.spotifyWebApi.setAccessToken(access_token);

          console.log('refreshed');
        }, (expires_in / 2) * 1000);
      })
      .catch((error) => {
        console.log('Error getting tokens', error);
        response.send(`Error getting tokens: ${error}`);
      });
  }
}
