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

  @Get('track')
  async getTrack(@Param() id) {
    const res = await this.appService.spotifyWebApi.getTrack(id);
    return res.body;
  }

  @Get('playlist')
  async getPlaylist(@Param() id) {
    const res = await this.appService.spotifyWebApi.getPlaylist(id);
    return res.body;
  }

  // could be redunant
  @Get('playlist-tracks')
  async getPlaylistTracks(@Param() id) {
    const res = await this.appService.spotifyWebApi.getPlaylistTracks(id);
    return res.body.items;
  }

  @Get('artist')
  async getArtist(@Param() id) {
    const res = await this.appService.spotifyWebApi.getArtist(id);
    return res.body;
  }

  @Get('album')
  async getAlbum(@Param() id) {
    const res = await this.appService.spotifyWebApi.getAlbum(id);
    return res.body;
  }

  @Get('albums-tracks')
  async getAlbumTracks(@Param() id) {
    const res = await this.appService.spotifyWebApi.getAlbumTracks(id);
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
        }, expires_in / 2);
      })
      .catch((error) => {
        console.log('Error getting tokens', error);
        response.send(`Error getting tokens: ${error}`);
      });
  }
}
