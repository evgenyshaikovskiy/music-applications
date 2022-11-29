import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class DatabaseManager {
  constructor(private readonly dbService: Neo4jService) {}

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
}
