export const Strategy = {
  ParseGraphDbObj: function (rawData) {
    return rawData.data.records.map((value) => {
      const record = value['_fields'][0];
      return {
        type: [record.labels],
        properties: record.properties,
        label:
          record.properties.title ||
          record.properties.name ||
          record.properties.kind,
      };
    });
  },
  ParseWebSpotifyObj: function (rawData) {
    const [type] = Object.keys(rawData.data);
    switch (type) {
      case 'tracks':
        return rawData.data.tracks.items.map((track) => {
          return {
            type: track.type,
            spotify_id: track.id,
            label: track.name,
            artists: track.artists.map((artist) => {
              return { spotify_id: artist.id, label: artist.name };
            }),
            album: {
              album_type: track.album.album_type,
              spotify_id: track.album.id,
              label: track.album.name,
            },
          };
        });
      case 'albums':
        return rawData.data.albums.items.map((album) => {
          return {
            type: album.type,
            album_type: album.album_type,
            tracks_num: album.total_tracks,
            spotify_id: album.id,
            artists: album.artists.map((artist) => {
              return { spotify_id: artist.id, label: artist.name };
            }),
            label: album.name,
            release_date: album.release_date,
          };
        });
      case 'artists':
        return rawData.data.artists.items.map((artist) => {
          return {
            type: artist.type,
            label: artist.name,
            genres: artist.genres,
            spotify_id: artist.id,
            images: artist.images,
          };
        });
      case 'playlists':
        return rawData.data.playlists.items.map((playlist) => {
          return {
            type: playlist.type,
            spotify_id: playlist.id,
            label: playlist.name,
            description: playlist.description,
            images: playlist.images,
          };
        });
    }
  },
};
