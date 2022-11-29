import { Injectable } from '@nestjs/common';
import { ApplicationConfig } from '../../../config/config';
import SpotifyWebApi = require('spotify-web-api-node');

// prop need to extract code to different services
@Injectable()
export class AppService {
  public scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
  ];
  public spotifyWebApi!: SpotifyWebApi;

  constructor() {
    this.spotifyWebApi = new SpotifyWebApi({
      clientId: ApplicationConfig.clientId,
      clientSecret: ApplicationConfig.clientSecret,
      redirectUri: 'http://localhost:4200/api/callback',
    });
  }

  private searchFromWeb(instance: string, query: string) {
    switch (instance) {
      case 'all':
        return this.spotifyWebApi.search(query, [
          'album',
          'artist',
          'playlist',
          'track',
        ]);
      case 'track':
        return this.spotifyWebApi.searchTracks(query);
      case 'album':
        return this.spotifyWebApi.searchAlbums(query);
      case 'playlist':
        return this.spotifyWebApi.searchPlaylists(query);
      case 'artist':
        return this.spotifyWebApi.searchArtists(query);
    }
  }

  private unwrapQuery(query) {
    return Object.keys(query).map((key) => {
      return [key.toString(), query[key].toString()];
    });
  }

  public async getWebData(query) {
    const [params] = this.unwrapQuery(query);
    const result = await this.searchFromWeb(params[0], params[1]);
    return result.body;
  }
}
