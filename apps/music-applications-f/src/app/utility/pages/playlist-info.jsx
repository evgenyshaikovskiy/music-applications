import { useNavigate } from 'react-router-dom';
import { PlaylistTrackInfo } from './page-utils';

const PlaylistInfo = ({ playlist }) => {
  const router = useNavigate();

  const trackNameClickCallback = (spotify_id) => router(`/track/${spotify_id}`);

  return (
    <div className="item-page-content">
      <div className="playlist-item-page-details-header">
        <div className="playlist-item-page-images">
          <img
            src={playlist.images[0].url}
            height={300}
            width={300}
            alt="playlist-cover"
          ></img>
        </div>
        <div className="featured-tracks-wrapper">
          <div className="playlist-name-label">{playlist.name}</div>
          <div className="featured-tracks-label">Featured tracks:</div>
          <div className="featured-tracks">
            {playlist.tracks.map((track, index) => {
              return (
                <PlaylistTrackInfo
                  track={track}
                  key={index}
                  index={index + 1}
                  onTrackClickCallback={trackNameClickCallback}
                ></PlaylistTrackInfo>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
