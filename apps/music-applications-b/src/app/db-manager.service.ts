import { Injectable } from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { timeStamp } from 'console';
import { Neo4jService } from 'nest-neo4j/dist';
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

    return result;
  }

  /*
     list of instances: artist, track, album, playlist, genre
     list of relations:
        :author between artist and track(or album)
        :appeared between secondary artist and track(or album) <- fits for sub instances
        :performsIn between artist and genre
        :contains between album or playlist and track

     algorithm for adding instances:
      1. Check whether instance is already existing in db.
      2. Check existence of all sub instances.
      3. Create instance if needed.
      4. Create sub instances {also get them from spotify by id, if necessary}.
      5. Provide relations.
  */

  private async isThereInstanceWithId(id: string) {
    const query = await this.dbService.read(
      `MATCH (instance) WHERE instance.spotify_id = '${id}' RETURN instance`
    );

    return query.records.length != 0;
  }

  public async addGenre(genreName: string) {
    const checkQuery = await this.dbService.read(
      `MATCH (genre: Genre) WHERE genre.name = '${genreName}' RETURN genre`
    );

    if (checkQuery.records.length === 0) {
      await this.dbService.write(
        `CREATE (genre: Genre {name: '${genreName}'})`
      );

      return true;
    }

    return false;
  }

  public async addAlbum(spotify_id: string) {
    const alreadyExists = await this.isThereInstanceWithId(spotify_id);

    if (!alreadyExists) {
      const album = await this.spotifyService.getAlbumById(spotify_id);

      // add album as instance
      await this.dbService.write(`
        CREATE (album: Album {
          name: '${album.name}',
          spotify_id: '${album.id}',
          type: '${album.album_type}',
          count_of_tracks: '${album.total_tracks}',
          label: '${album.label}',
          release: '${album.release_date}'
        })`);

      // add genres
      for (const genre of album.genres) {
        // create genre if possible
        await this.addGenre(genre);
        await this.dbService.write(`
          MATCH
            (album: Album {spotify_id: '${spotify_id}'}),
            (genre: Genre {name: '${genre}'})
          MERGE (album)-[r:RelatedToGenre]->(genre)
          RETURN type(r)`);
      }

      // add artists
      for (const artist of album.artists) {
        await this.addArtist(artist.id);
      }

      // draw author relation
      const albumAuthor = album.artists.shift();
      await this.dbService.write(`
        MATCH
          (artist: Artist {spotify_id: '${albumAuthor.id}'}),
          (album: Album {spotify_id: '${spotify_id}'})
        MERGE (artist)-[r:Author]->(album)
        RETURN type(r)`);

      // draw appeared at relation
      for (const artist of album.artists) {
        await this.dbService.write(`
          MATCH
            (artist: Artist {spotify_id: '${artist.id}'}),
            (album: Album {spotify_id: '${spotify_id}'})
          MERGE (artist)-[r:AppearedAt]->(album)
          RETURN type(r)`);
      }

      for (const track of album.tracks.items) {
        await this.addTrack(track.id);
        await this.dbService.write(`
          MATCH
            (album: Album {spotify_id: '${spotify_id}'}),
            (track: Track {spotify_id: '${track.id}'})
          MERGE (album)-[r:Contains]->(track)
          RETURN type(r)`);
      }

      return true;
    }

    return false;
  }

  public async addArtist(spotify_id: string) {
    const alreadyExists = await this.isThereInstanceWithId(spotify_id);

    if (!alreadyExists) {
      // create artist
      const artist = await this.spotifyService.getArtistById(spotify_id);

      await this.dbService.write(`
        CREATE (artist: Artist {
          name: '${artist.name}',
          spotify_id: '${artist.id}',
          type: '${artist.type}'
        })`);

      // sequence
      for (const genre of artist.genres) {
        await this.addGenre(genre);
      }

      for (const genre of artist.genres) {
        await this.dbService.write(`
          MATCH
            (artist: Artist {spotify_id: '${artist.id}'}),
            (genre: Genre {name: '${genre}'})
          MERGE (artist)-[r:PerformsInGenre]->(genre)
          RETURN type(r)`);
      }

      return true;
    }

    return false;
  }

  public async addPlaylist(spotify_id: string) {
    const playlist = await this.spotifyService.getArtistById(spotify_id);
    console.log(playlist);
  }

  public async addTrack(spotify_id: string) {
    const alreadyExists = await this.isThereInstanceWithId(spotify_id);

    if (!alreadyExists) {
      const track = await this.spotifyService.getTrackById(spotify_id);

      // create track at first
      await this.dbService.write(`
        CREATE (track: Track {
          name: '${track.name}',
          duration_ms: '${track.duration_ms}',
          explicit: '${track.explicit}',
          spotify_id: '${track.id}'
        })`);

      // relate artists to track
      // first add artists
      for (const artist of track.artists) {
        await this.addArtist(artist.id);
      }

      // add author relations
      const trackAuthor = track.artists.shift();
      await this.dbService.write(`
        MATCH
          (artist: Artist {spotify_id: '${trackAuthor.id}'}),
          (track: Track {spotify_id: '${spotify_id}'})
        MERGE (artist)-[r:Author]->(track)
        RETURN type(r)`);

      for (const artist of track.artists) {
        await this.dbService.write(`
          MATCH
            (artist: Artist {spotify_id: '${artist.id}'}),
            (track: Track {spotify_id: '${spotify_id}'})
          MERGE (artist)-[r:AppearedAt]->(track)
          RETURN type(r)`);
      }

      return true;
    }

    return false;
  }

  // its in the past:)
  // // add functions
  // public async addAlbum(album: Album) {
  //   const checkForExistence = await this.dbService.read(
  //     `MATCH (obj: Album) WHERE obj.spotify_id = '${album.spotify_id}' RETURN obj`
  //   );

  //   // record does not exist
  //   if (checkForExistence.records.length == 0) {
  //     await this.dbService.write(
  //       `CREATE (album:Album {
  //         name: '${album.name}',
  //         label: '${album.label}',
  //         album_type: '${album.album_type}',
  //         release_date: '${album.release_date}',
  //         tracks_num: '${album.tracks_num}',
  //         spotify_id: '${album.spotify_id}'})`
  //     );

  //     // add all possible tracks
  //     const tracksOnAlbum = (
  //       await Promise.all(
  //         album.tracks.map((track) =>
  //           this.spotifyService.getTrackById(track.spotify_id)
  //         )
  //       )
  //     ).map((track) => {
  //       return {
  //         name: track.name,
  //         spotify_id: track.id,
  //         duration_ms: track.duration_ms,
  //         artists: track.artists.map((artist) => {
  //           return { name: artist.name, spotify_id: artist.id };
  //         }),
  //         album: album,
  //       };
  //     }) as unknown as Track[];

  //     /*
  //           MATCH
  //             (artist: Artist {spotify_id: '${artist.spotify_id}'}),
  //             (track: Track {spotify_id: '${track.spotify_id}'})
  //           MERGE (artist)-[r:Author]->(track)
  //           RETURN type(r)`);
  //     */
  //     await Promise.all(tracksOnAlbum.map((track) => this.addTrack(track)));

  //     // draw all relations
  //     await Promise.all(
  //       tracksOnAlbum.map((track) => {
  //         return this.dbService.write(`
  //         MATCH
  //           (album: Album {spotify_id: '${album.spotify_id}'}),
  //           (track: Track {spotify_id: '${track.spotify_id}'})
  //         MERGE (album)-[r:Contains]->(track)
  //         RETURN type(r)`);
  //       })
  //     );
  //     return true;
  //   }

  //   return false;
  // }

  // public async addTrack(track: Track) {
  //   const checkForExistence = await this.dbService.read(
  //     `MATCH (obj: Track) WHERE obj.spotify_id = '${track.spotify_id}' RETURN obj`
  //   );

  //   if (checkForExistence.records.length == 0) {
  //     await this.dbService.write(`CREATE (track: Track {
  //       name: '${track.name}',
  //       duration_ms: '${track.duration_ms}',
  //       spotify_id: '${track.spotify_id}'
  //       })`);

  //     const artistsOnTrackPromises = track.artists.map((artist) => {
  //       return this.spotifyService.getArtistById(artist.spotify_id);
  //     });

  //     const artistsOnTrack = (await Promise.all(artistsOnTrackPromises)).map(
  //       (artist) => artist as unknown as Artist
  //     );

  //     // add all artists that are not created yet
  //     await Promise.all(artistsOnTrack.map((artist) => this.addArtist(artist)));

  //     // draw relations between artists and track(1 - author, other - appeared at)
  //     await Promise.all(
  //       artistsOnTrack.map((artist, index) => {
  //         if (index == 0) {
  //           return this.dbService.write(`
  //           MATCH
  //             (artist: Artist {spotify_id: '${artist.spotify_id}'}),
  //             (track: Track {spotify_id: '${track.spotify_id}'})
  //           MERGE (artist)-[r:Author]->(track)
  //           RETURN type(r)`);
  //         } else {
  //           return this.dbService.write(`
  //           MATCH
  //             (artist: Artist {spotify_id: '${artist.spotify_id}'}),
  //             (track: Track {spotify_id: '${track.spotify_id}'})
  //           MERGE (artist)-[r:AppearedIn]->(track)
  //           RETURN type(r)`);
  //         }
  //       })
  //     );

  //     // check album in db
  //     const checkAlbumForExistence = await this.dbService.read(
  //       `MATCH (obj: Album) WHERE obj.spotify_id = '${track.album.spotify_id}' RETURN obj`
  //     );

  //     if (checkAlbumForExistence.records.length == 0) {
  //       const album = await this.spotifyService.getAlbumById(
  //         track.album.spotify_id
  //       );

  //       // eto polniy pizdec, o4en' ploxo
  //       const parsedAlbum: Album = {
  //         album_type: album.album_type,
  //         artists: album.artists.map((artist) => {
  //           return {
  //             name: artist.name,
  //             spotify_id: artist.id,
  //           };
  //         }),
  //         label: album.label,
  //         name: album.name,
  //         release_date: album.release_date,
  //         spotify_id: album.id,
  //         tracks: album.tracks.items.map((track) => {
  //           return {
  //             artists: track.artists.map((artist) => {
  //               return { name: artist.name, spotify_id: artist.id };
  //             }),
  //             name: track.name,
  //             spotify_id: track.id,
  //             track_num: track.track_number,
  //           };
  //         }),
  //         tracks_num: album.total_tracks,
  //       };

  //       await this.addAlbum(parsedAlbum);
  //     }

  //     return true;
  //   }

  //   return false;
  // }

  // public async addArtist(artist: Artist) {
  //   const checkForExistence = await this.dbService.read(
  //     `MATCH(obj: Artist) WHERE obj.spotify_id = '${artist.spotify_id}' RETURN obj;`
  //   );

  //   if (checkForExistence.records.length === 0) {
  //     await this.dbService.write(`CREATE (artist: Artist {
  //       name: '${artist.name}',
  //       spotify_id: '${artist.spotify_id}',
  //       type: '${artist.type}'})`);

  //     await Promise.all(
  //       artist.genres.map((genre) => this.addGenreIfNotExists(genre))
  //     );

  //     await Promise.all(
  //       artist.genres.map((genre) =>
  //         this.dbService.write(`
  //       MATCH
  //         (artist: Artist {spotify_id: '${artist.spotify_id}'}),
  //         (genre: Genre {name: '${genre}'})
  //       MERGE (artist)-[r:PerformsIn]->(genre)
  //       RETURN type(r)`)
  //       )
  //     );

  //     return true;
  //   }

  //   return false;
  // }

  // public async addGenreIfNotExists(genreName: string) {
  //   const checkForExistence = await this.dbService.read(
  //     `MATCH (obj: Genre) WHERE obj.name = '${genreName}' return obj`
  //   );

  //   if (checkForExistence.records.length == 0) {
  //     const addQuery = await this.dbService.read(
  //       `CREATE (genre: Genre {name: '${genreName}'})`
  //     );

  //     return true;
  //   }

  //   return false;
  // }
}
