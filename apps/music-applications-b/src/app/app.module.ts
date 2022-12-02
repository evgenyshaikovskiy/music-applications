import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';

import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';
import { ApplicationConfig } from '../../../config/config';
import { TrackController } from './controllers/track.controller';
import { PlaylistController } from './controllers/playlist.controller';
import { AlbumController } from './controllers/album.controller';
import { ArtistController } from './controllers/artist.controller';
import { DatabaseManager } from './db-manager.service';
import { SpotifyService } from './spotify.service';
import { NetworkController } from './controllers/network.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    Neo4jModule.forRoot({
      scheme: ApplicationConfig.scheme as Neo4jScheme,
      host: ApplicationConfig.host,
      port: '',
      username: ApplicationConfig.username,
      password: ApplicationConfig.password,
    }),
  ],
  controllers: [
    AppController,
    TrackController,
    PlaylistController,
    AlbumController,
    ArtistController,
    NetworkController,
  ],
  providers: [AppService, DatabaseManager, SpotifyService],
})
export class AppModule {}
