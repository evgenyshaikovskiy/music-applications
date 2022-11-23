import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class AppService {
  constructor(private readonly dbService: Neo4jService) {}

  // refactor to one method??
  private searchArtistQuery = (artistName: string) =>
    `MATCH (obj: Person) WHERE ToLower(obj.name) CONTAINS '${artistName}' return obj.name as label`;

  private searchAlbumQuery = (albumTitle: string) =>
    `MATCH (obj: Album) WHERE ToLower(obj.title) CONTAINS '${albumTitle}' return obj.title as label`;

  private searchGenreQuery = (genreKind: string) =>
    `MATCH (obj: Genre) WHERE ToLower(obj.kind) CONTAINS '${genreKind}' return obj.kind as label`;

  private searchSongQuery = (songTitle: string) =>
    `MATCH (obj: Song) WHERE ToLower(obj.title) CONTAINS '${songTitle}' return obj.title as label`;

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
}
