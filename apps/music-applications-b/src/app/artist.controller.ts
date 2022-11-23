import { Controller, Get, Param } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Controller('artist')
export class ArtistController {
  constructor(private readonly dbService: Neo4jService) {}

  @Get(':name')
  async getArtist(@Param() params) {
    const res = await this.dbService.read(
      `MATCH (a:Person WHERE ToLower(a.name) = '${params.name}')-[r]-(b)
      RETURN r, a, b;`
    );

    return res;
  }
}
