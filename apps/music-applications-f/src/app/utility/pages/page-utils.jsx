import { convertDuration } from '../utils';

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
      <div
        className="album-track-name"
        onClick={() => onTrackClickCallback(track.spotify_id)}
      >
        {track.track_num}.{' '}
        {track.artists.map((artist) => artist.label).join(', ')} - {track.label}
      </div>
      <div className="album-track-info">
        <div>Duration: {convertDuration(track.duration_ms)}</div>
        <div>Explicit: {track.explicit ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export const PlaylistTrackInfo = ({ track, index, onTrackClickCallback }) => {
  return (
    <div className="playlist-track-text">
      <div
        className="playlist-track-name"
        onClick={() => onTrackClickCallback(track.spotify_id)}
      >
        {index}. {track.artists.map((artist) => artist.label).join(', ')} -{' '}
        {track.label}
      </div>
      <div className="playlist-track-info">
        <div>Duration: {convertDuration(track.duration_ms)}</div>
        <div>Explicit: {track.explicit ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export const PopupMessage = ({ message, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="popup-message">{message}</div>
    </div>
  );
};
