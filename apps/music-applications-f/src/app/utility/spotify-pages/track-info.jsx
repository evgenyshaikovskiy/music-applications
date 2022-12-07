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
          <div className="track-item-title-info">
            <div className="track-item-type-text">SONG</div>
            <div className="track-item-name">{track.label}</div>
          </div>
          <div className="track-item-additional-info">
            <audio controls="true" class="audio-1" className="track-preview-audio">
              <source src={track.preview_url}></source>
            </audio>
            <div>Explicit: {track.explicit ? 'Explicit' : 'Not explicit'}</div>
            <div>
              Album:{' '}
              <span
                className="track-album-name"
                onClick={() => router(`/album/${track.album.spotify_id}`)}
              >
                {track.album.label}
              </span>
            </div>
          </div>
          <div className="track-item-footer">
            <div className="track-artistlist">
              {track.artists.map((artist, index) => (
                <ArtistTrackName
                  artist={artist}
                  onArtistClickCallback={artistNameClickCallback}
                  key={index}
                ></ArtistTrackName>
              ))}
            </div>
            <div className="symbol">&#9679;</div>
            <div>{track.album.release_date.slice(0, 4)}</div>
            <div className="symbol">&#9679;</div>
            <div>{convertDuration(track.duration_ms)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
