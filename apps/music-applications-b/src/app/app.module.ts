import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';
import { ApplicationConfig } from '../../../config/config';
@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: ApplicationConfig.scheme as Neo4jScheme,
      host: ApplicationConfig.host,
      port: '',
      username: ApplicationConfig.username,
      password: ApplicationConfig.password,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
