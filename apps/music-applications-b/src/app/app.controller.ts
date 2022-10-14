import { Controller, Get } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';


@Controller()
export class AppController {
  constructor(private readonly dbService: Neo4jService) {
  }

  @Get()
  async getData() {
    const res = await this.dbService.read('MATCH (n) RETURN count(n) AS count');
    return `There are ${res.records[0].get('count')} nodes in db.`
  }
}
