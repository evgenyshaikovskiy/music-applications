import { Controller, Get, Query } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Controller()
export class AppController {
  constructor(private readonly dbService: Neo4jService) {}

  @Get('search')
  async getData(@Query() query) {
    console.log(query);
    const res = await this.dbService.read(
      `MATCH (person:Person) WHERE ToLower(person.name) CONTAINS '${query.word}' return person.name`
    );

    return res;
  }
}
