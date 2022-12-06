export const Strategy = {
  ParseGraphObjWithRelations: function (data) {
    // there is a bug, where if node doesn't have any relationships

    // parse main object, that was initially searched
    let obj = {};

    console.log(data);
    if (data.length > 0) {
      // parse object
      obj.type = data[0]._fields[0].labels;
      obj.properties = data[0]._fields[0].properties;

      obj.relations = [];

      // then for each object need to parse relationships
      // it is not good at all
      for (const objAndRelation of data) {
        const relation = objAndRelation._fields[1];
        const targetNode = objAndRelation._fields[2];

        obj.relations.push({
          type: relation.type,
          target: {
            type: targetNode.labels[0],
            properties: targetNode.properties,
          },
        });
      }
    }

    return obj;
  },
  ParseGraphDbObj: function (rawData) {
    return rawData.data.records.map((value) => {
      const record = value['_fields'][0];
      return {
        type: [record.labels],
        label: record.properties.name,
        spotify_id: record.properties.spotify_id,
      };
    });
  },
  // actually there can be only one method to extract same properties from every instance...
  ExtractTrackProperties: function (track) {
    return {
      type: track.type,
      spotify_id: track.id,
      label: track.name,
    };
  },
  ExtractAlbumProperties: function (album) {
    return {
      type: album.type,
      spotify_id: album.id,
      label: album.name,
    };
  },
  ExtractArtistProperties: function (artist) {
    return {
      type: artist.type,
      label: artist.name,
      spotify_id: artist.id,
    };
  },
  ExtractPlaylistProperties: function (playlist) {
    return {
      type: playlist.type,
      spotify_id: playlist.id,
      label: playlist.name,
    };
  },
  ParseWebSpotifyObj: function (rawData) {
    if (Object.keys(rawData.data).length > 1) {
      const result = [];

      const parsedTracks = rawData.data.tracks.items.map((track) =>
        Strategy.ExtractTrackProperties(track)
      );

      const parsedAlbums = rawData.data.albums.items.map((album) =>
        Strategy.ExtractAlbumProperties(album)
      );

      const parsedArtists = rawData.data.artists.items.map((artist) =>
        Strategy.ExtractArtistProperties(artist)
      );

      const parsedPlaylists = rawData.data.playlists.items.map((playlist) =>
        Strategy.ExtractPlaylistProperties(playlist)
      );

      let size = Math.min(
        parsedTracks.length,
        parsedAlbums.length,
        parsedArtists.length,
        parsedPlaylists.length
      );

      for (let i = 0; i < size; i++) {
        result.push(
          parsedTracks[i],
          parsedAlbums[i],
          parsedPlaylists[i],
          parsedArtists[i]
        );
      }

      return result;
    }

    const [type] = Object.keys(rawData.data);
    switch (type) {
      case 'tracks':
        return rawData.data.tracks.items.map((track) =>
          Strategy.ExtractTrackProperties(track)
        );
      case 'albums':
        return rawData.data.albums.items.map((album) =>
          Strategy.ExtractAlbumProperties(album)
        );
      case 'artists':
        return rawData.data.artists.items.map((artist) =>
          Strategy.ExtractArtistProperties(artist)
        );
      case 'playlists':
        return rawData.data.playlists.items.map((playlist) =>
          Strategy.ExtractPlaylistProperties(playlist)
        );
    }
  },
  ParseSpotifyTrack: function (track) {
    return {
      type: track.type,
      label: track.name,
      spotify_id: track.id,
      explicit: track.explicit,
      duration_ms: track.duration_ms,
      preview_url: track.preview_url,
      artists: track.artists.map((artist) => {
        return { label: artist.name, spotify_id: artist.id, type: artist.type };
      }),
      album: {
        spotify_id: track.album.id,
        type: track.album.type,
        images: track.album.images,
        label: track.album.name,
        album_type: track.album.album_type,
        release_date: track.album.release_date,
        total_tracks: track.album.total_tracks,
      },
    };
  },
  ParseSpotifyArtist: function (artist) {
    return {
      genres: artist.genres,
      type: artist.type,
      spotify_id: artist.id,
      label: artist.name,
      images: artist.images,
    };
  },
  ParseSpotifyPlaylist: function (playlist) {
    return {
      spotify_id: playlist.id,
      description: playlist.description,
      owner_name: playlist.owner.display_name,
      images: playlist.images,
      name: playlist.name,
      collaborative: playlist.collaborative,
      type: playlist.type,
      tracks_num: playlist.tracks.total,
      tracks: playlist.tracks.items.slice(0, -1).map((value) => {
        return {
          type: value['track'].type,
          label: value['track'].name,
          spotify_id: value['track'].id,
          explicit: value['track'].explicit,
          duration_ms: value['track'].duration_ms,
          track_num: value['track'].track_number,
          artists: value['track'].artists.map((artist) => {
            return {
              label: artist.name,
              spotify_id: artist.id,
              type: artist.type,
            };
          }),
          album: {
            spotify_id: value['track'].album.id,
            type: value['track'].album.type,
            label: value['track'].album.name,
            album_type: value['track'].album.album_type,
          },
        };
      }),
    };
  },
  ParseSpotifyAlbum: function (album) {
    return {
      spotify_id: album.id,
      type: album.type,
      album_type: album.album_type,
      release_date: album.release_date,
      tracks_num: album.total_tracks,
      label: album.name,
      actual_label: album.label,
      images: album.images,
      tracks: album.tracks.items.map((track) => {
        return {
          type: track.type,
          label: track.name,
          spotify_id: track.id,
          explicit: track.explicit,
          duration_ms: track.duration_ms,
          track_num: track.track_number,
          artists: track.artists.map((artist) => {
            return {
              label: artist.name,
              spotify_id: artist.id,
              type: artist.type,
            };
          }),
        };
      }),
      artist: album.artists.map((artist) => {
        return {
          label: artist.name,
          spotify_id: artist.id,
          type: artist.type,
        };
      }),
    };
  },
};
