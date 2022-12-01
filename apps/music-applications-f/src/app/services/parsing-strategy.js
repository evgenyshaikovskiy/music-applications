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
  CollectTrack: function (item) {
    return {
      name: item.label,
      spotify_id: item.spotify_id,
      duration_ms: item.duration_ms,
      artists: item.artists.map((artist) => {
        return { name: artist.label, spotify_id: artist.spotify_id };
      }),
      album: {
        name: item.album.label,
        spotify_id: item.album.spotify_id,
        album_type: item.album.album_type,
        release_date: item.album.release_date,
        total_tracks: item.album.total_tracks,
      },
    };
  },
  CollectArtist: function (item) {
    return {
      name: item.label,
      genres: item.genres,
      spotify_id: item.spotify_id,
      type: item.type,
    };
  },
  CollectPlaylist: function (item) {
    return {
      name: item.name,
      spotify_id: item.spotify_id,
      type: item.type,
      tracks_num: item.tracks.length,
      tracks: item.tracks.map((track) => {
        return {
          name: track.label,
          spotify_id: track.spotify_id,
          artists: track.artists.map((artist) => {
            return { name: artist.label, spotify_id: artist.spotify_id };
          }),
          album: {
            spotify_id: track.album.spotify_id,
            name: track.album.label,
            album_type: track.album.album_type,
          },
        };
      }),
    };
  },
  CollectAlbum: function (item) {
    return {
      spotify_id: item.spotify_id,
      album_type: item.album_type,
      release_date: item.release_date,
      tracks_num: item.tracks.length,
      name: item.label,
      label: item.actual_label,
      tracks: item.tracks.map((track) => {
        return {
          name: track.label,
          spotify_id: track.spotify_id,
          track_num: track.track_num,
          artists: track.artists.map((artist) => {
            return {
              name: artist.label,
              spotify_id: artist.spotify_id,
            };
          }),
        };
      }),
      artists: item.artist.map((value) => {
        return {
          name: value.label,
          spotify_id: value.spotify_id,
        };
      }),
    };
  },
};
