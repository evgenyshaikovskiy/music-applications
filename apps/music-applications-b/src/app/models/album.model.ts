export class Album {
  album_type: string;
  // artists that were featured on album
  artists: { name: string; spotify_id: string }[];
  label: string;
  name: string;
  release_date: string;
  spotify_id: string;
  // tracks on album
  tracks: {
    artists: { name: string; spotify_id: string }[];
    name: string;
    spotify_id: string;
    track_num: number;
  }[];
  tracks_num: number;
}
