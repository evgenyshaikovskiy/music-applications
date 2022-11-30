import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { Album } from './models/album.model';
import { Artist } from './models/artist.model';
import { SpotifyService } from './spotify.service';

@Injectable()
export class DatabaseManager {
  constructor(
    private readonly dbService: Neo4jService,
    private readonly spotifyService: SpotifyService
  ) {}

  // need to add search playlist function
  private searchArtistQuery = (artistName: string) =>
    `MATCH (obj: Person) WHERE ToLower(obj.name) CONTAINS '${artistName}' return obj`;

  private searchAlbumQuery = (albumTitle: string) =>
    `MATCH (obj: Album) WHERE ToLower(obj.title) CONTAINS '${albumTitle}' return obj`;

  private searchGenreQuery = (genreKind: string) =>
    `MATCH (obj: Genre) WHERE ToLower(obj.kind) CONTAINS '${genreKind}' return obj`;

  private searchTrackQuery = (songTitle: string) =>
    `MATCH (obj: Song) WHERE ToLower(obj.title) CONTAINS '${songTitle}' return obj`;

  private searchFunctions = [
    this.searchArtistQuery,
    this.searchAlbumQuery,
    this.searchGenreQuery,
    this.searchTrackQuery,
  ];

  private collectQuery(instance: string, query: string): string {
    switch (instance) {
      case 'all':
        return this.searchFunctions.map((func) => func(query)).join(' UNION ');
      case 'artist':
        return this.searchArtistQuery(query);
      case 'track':
        return this.searchTrackQuery(query);
      case 'album':
        return this.searchAlbumQuery(query);
      case 'genre':
        return this.searchGenreQuery(query);
    }
  }

  private unwrapQuery(query) {
    return Object.keys(query).map((key) => {
      return [key.toString(), query[key].toString()];
    });
  }

  public async getData(query) {
    const [params] = this.unwrapQuery(query);
    const result = await this.dbService.read(
      this.collectQuery(params[0], params[1])
    );
    return result;
  }

  public async getCountOfNodesInDb() {
    const result = await this.dbService.read(
      `MATCH (n) RETURN count(n) as count`
    );

    /*
     list of instances: artist, track, album, playlist, genre
     list of relations:  :author between artist and track(or album)
                         :appeared between secondary artist and track(or album) <- fits for subinstances
                         :performsIn between artist and genre
                         :contains between album or playlist and track

     algorithm for adding instances:
      1. Check whether instance is already existing in db.
      2. Check existence of all sub instances.
      3. Create instance if needed.
      4. Create sub instances {also get them from spotify by id, if necessary}.
      5. Provide relations.
     */

    return result;
  }

  // add functions
  public async addAlbum(album: Album) {
    const checkForExistence = await this.dbService.read(
      `MATCH (obj: Album) WHERE obj.spotify_id = '${album.spotify_id}' RETURN obj`
    );

    console.log(checkForExistence, 'step 1');

    // check sub instances block
    console.log(album.tracks);

    // record does not exist
    if (checkForExistence.records.length == 0) {
      const addQuery = await this.dbService.read(
        `CREATE (album:Album {
          name: '${album.name}',
          label: '${album.label}',
          album_type: '${album.album_type}',
          release_date: '${album.release_date}',
          tracks_num: '${album.tracks_num}',
          spotify_id: '${album.spotify_id}'})`
      );

      console.log(addQuery, 'step - 3');
    }

    return true;
  }

  public async addArtist(artist: Artist) {
    const checkForExistence = await this.dbService.read(
      `MATCH(obj: Artist) WHERE obj.spotify_id = '${artist.spotify_id}' RETURN obj;`
    );

    if (checkForExistence.records.length === 0) {
      await this.dbService.write(`CREATE (artist: Artist {
        name: '${artist.name}',
        spotify_id: '${artist.spotify_id}',
        type: '${artist.type}'})`);

      await Promise.all(
        artist.genres.map((genre) => this.addGenreIfNotExists(genre))
      );

      await Promise.all(
        artist.genres.map((genre) =>
          this.dbService.write(`
        MATCH
          (artist: Artist {spotify_id: '${artist.spotify_id}'}),
          (genre: Genre {name: '${genre}'})
        MERGE (artist)-[r:PerformsIn]->(genre)
        RETURN type(r)`)
        )
      );

      return true;
    }

    return false;
  }

  public async addGenreIfNotExists(genreName: string) {
    const checkForExistence = await this.dbService.read(
      `MATCH (obj: Genre) WHERE obj.name = '${genreName}' return obj`
    );

    if (checkForExistence.records.length == 0) {
      const addQuery = await this.dbService.read(
        `CREATE (genre: Genre {name: '${genreName}'})`
      );

      return true;
    }

    return false;
  }
}
