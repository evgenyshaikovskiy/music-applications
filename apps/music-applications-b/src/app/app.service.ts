import { Injectable } from '@nestjs/common';
import { ApplicationConfig } from '../../../config/config';
import { Neo4jService } from 'nest-neo4j/dist';
import SpotifyWebApi = require('spotify-web-api-node');

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

  constructor(private readonly dbService: Neo4jService) {
    this.spotifyWebApi = new SpotifyWebApi({
      clientId: ApplicationConfig.clientId,
      clientSecret: ApplicationConfig.clientSecret,
      redirectUri: 'http://127.0.0.1:4200/api/callback',
    });
  }

  // refactor to one method??
  private searchArtistQuery = (artistName: string) =>
    `MATCH (obj: Person) WHERE ToLower(obj.name) CONTAINS '${artistName}' return obj`;

  private searchAlbumQuery = (albumTitle: string) =>
    `MATCH (obj: Album) WHERE ToLower(obj.title) CONTAINS '${albumTitle}' return obj`;

  private searchGenreQuery = (genreKind: string) =>
    `MATCH (obj: Genre) WHERE ToLower(obj.kind) CONTAINS '${genreKind}' return obj`;

  private searchSongQuery = (songTitle: string) =>
    `MATCH (obj: Song) WHERE ToLower(obj.title) CONTAINS '${songTitle}' return obj`;

  private searchFunctions = [
    this.searchArtistQuery,
    this.searchAlbumQuery,
    this.searchGenreQuery,
    this.searchSongQuery,
  ];

  private collectQuery(instance: string, query: string): string {
    switch (instance) {
      case 'all':
        return this.searchFunctions.map((func) => func(query)).join(' UNION ');
      case 'artist':
        return this.searchArtistQuery(query);
      case 'song':
        return this.searchSongQuery(query);
      case 'album':
        return this.searchAlbumQuery(query);
      case 'genre':
        return this.searchGenreQuery(query);
    }
  }

  private unwrapQuery(query) {
    return Object.keys(query).map((key) => {
      return [query[key].toString(), key.toString()];
    });
  }

  public async getData(query) {
    const [params] = this.unwrapQuery(query);
    const result = await this.dbService.read(
      this.collectQuery(params[1], params[0])
    );
    return result;
  }

  public async getWebData(query) {
    const [params] = this.unwrapQuery(query);
    console.log(params);
    const result = await this.spotifyWebApi.searchTracks(params[0]);
    return result.body.tracks;
  }
}
