export class Track {
  name: string;
  spotify_id: string;
  duration_ms: number;
  // artists that were featured on that track
  artists: { name: string; spotify_id: string }[];
  album: {
    album_type: string;
    name: string;
    release_date: string;
    spotify_id: string;
    total_tracks: number;
  };
}
