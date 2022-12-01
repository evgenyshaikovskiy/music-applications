import { convertDuration } from "../utils";

export const ArtistTrackName = ({ artist, onArtistClickCallback }) => {
  return (
    <div
      onClick={() => onArtistClickCallback(artist.spotify_id)}
      className="artist-name"
    >
      {artist.label}
    </div>
  );
};

export const AlbumTrackInfo = ({ track, onTrackClickCallback }) => {
  return (
    <div className="album-track-text">
      <p
        className="album-track-name"
        onClick={() => onTrackClickCallback(track.spotify_id)}
      >
        {track.track_num}.{' '}
        {track.artists.map((artist) => artist.label).join(', ')} - {track.label}
      </p>
      <div className="album-track-info">
        <p>Duration: {convertDuration(track.duration_ms)}</p>
        <p>Explicit: {track.explicit ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export const PlaylistTrackInfo = ({ track, index, onTrackClickCallback }) => {
  return (
    <div className="playlist-track-text">
      <p
        className="playlist-track-name"
        onClick={() => onTrackClickCallback(track.spotify_id)}
      >
        {index}. {track.artists.map((artist) => artist.label).join(', ')} -{' '}
        {track.label}
      </p>
      <div className="playlist-track-info">
        <p>Duration: {convertDuration(track.duration_ms)}</p>
        <p>Explicit: {track.explicit ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export const LoadingSpinner = () => {
  return <div className="spinner-container">
    <div className="loading-spinner"></div>
  </div>
}
