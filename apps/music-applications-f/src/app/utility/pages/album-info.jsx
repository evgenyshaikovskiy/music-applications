import { convertDuration } from '../utils';
import { useNavigate } from 'react-router-dom';

const AlbumInfo = ({ album }) => {
  const router = useNavigate();
  const trackNameClickCallback = (spotify_id) => router(`/track/${spotify_id}`);

  return (
    <div className="item-page-content">
      <div>
        <div className="album-item-page-details-header">
          <div className="album-item-page-images">
            <img
              src={album.images[1].url}
              height={album.images[1].height}
              width={album.images[1].width}
              alt="album-cover"
            ></img>
          </div>
          <div className="album-item-page-title">
            <div className="album-type-text">
              <p>{album.album_type.toUpperCase()}</p>
            </div>
            <div className="album-label-text">
              <p>{album.label}</p>
            </div>
            <div className="album-info-text">
              <p> {album.artist.map((artist) => artist.label).join(' ')}</p>
              <p className="symbol">&#9679;</p>
              <p>{album.release_date.slice(0, 4)}</p>
              <p className="symbol">&#9679;</p>
              <p>{album.tracks_num} tracks</p>
            </div>
          </div>
        </div>
        <div>
          <p className="featured-tracks-label">Featured tracks:</p>{' '}
          {album.tracks.map((track, index) => {
            return (
              <AlbumTrackInfo
                track={track}
                key={index}
                onTrackClickCallback={trackNameClickCallback}
              />
            );
          })}
        </div>
        <div className="album-item-page-details-textbox">
          <p>Album label: {album.actual_label}</p>
          <p>Album was released at {album.release_date}</p>
        </div>
      </div>
    </div>
  );
};

const AlbumTrackInfo = ({ track, onTrackClickCallback }) => {
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

export default AlbumInfo;
