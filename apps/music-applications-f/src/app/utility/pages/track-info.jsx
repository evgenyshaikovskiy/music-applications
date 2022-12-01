import { useNavigate } from 'react-router-dom';
import { convertDuration } from '../utils';
import { ArtistTrackName } from './page-utils';

const TrackInfo = ({ track }) => {
  const router = useNavigate();
  const artistNameClickCallback = (spotify_id) =>
    router(`/artist/${spotify_id}`);

  return (
    <div className="item-page-content">
      <div className="track-page-content-wrapper">
        <div className="track-album-image">
          <img
            src={track.album.images[1].url}
            height={300}
            width={300}
            alt="album-cover"
          ></img>
        </div>
        <div className="track-item-info">
          <div className="track-item-type-text">SONG</div>
          <div className="track-item-name">{track.label}</div>
          <div className="track-item-additional-info">
            <audio controls className="track-preview-audio">
              <source src={track.preview_url}></source>
            </audio>
            <p>Explicit: {track.explicit ? 'Explicit' : 'Not explicit'}</p>
            <p>
              Album:{' '}
              <span
                className="track-album-name"
                onClick={() => router(`/album/${track.album.spotify_id}`)}
              >
                {track.album.label}
              </span>
            </p>
          </div>
          <div className="track-item-footer">
            <div>
              {track.artists.map((artist, index) => (
                <ArtistTrackName
                  artist={artist}
                  onArtistClickCallback={artistNameClickCallback}
                  key={index}
                ></ArtistTrackName>
              ))}
            </div>
            <p className="symbol">&#9679;</p>
            <p>{track.album.release_date.slice(0, 4)}</p>
            <p className="symbol">&#9679;</p>
            <p>{convertDuration(track.duration_ms)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
