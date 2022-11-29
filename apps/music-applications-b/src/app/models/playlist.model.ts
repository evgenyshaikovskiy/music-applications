export class Playlist {
  name: string;
  spotify_id: string;
  tracks: {
    album: { album_type: string; name: string; spotify_id: string };
    artists: { name: string; spotify_id: string }[];
    name: string;
    spotify_id: string;
  }[];
  tracks_num: number;
}
