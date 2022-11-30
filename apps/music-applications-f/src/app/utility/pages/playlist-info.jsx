import { convertDuration } from '../utils';

const PlaylistInfo = ({ playlist }) => {
  return (
    <div className="item-page-content">
      <div>
        <div className="playlist-item-page-details-header">
            <div className="playlist-item-page-images">
              <img
                src={playlist.images[0].url}
                height='300px'
                width='300px'
                alt="playlist-cover"
              ></img>
            </div>
              <div className="playlist-item-page-title">
                <div className="playlist-type-text">
                  <p>
                    PLAYLIST
                  </p>
                </div>
                <div className="playlist-label-text">
                  <p>
                    {playlist.name}
                  </p>
                </div>
                <div className="playlist-info-text">
                  <p>
                    {' '} 
                    Playlist is {playlist.collaborative ? '' : 'not'} collaborative
                  </p>
                  <p className='playlist-symbol'>&#9679;</p>
                  <p>
                    Playlist contains {playlist.tracks.length} tracks
                  </p>
                </div> 
              </div>
          </div>
        
        <div>
          <p className='playlist-feature-track-label'>Featured tracks:</p>
            {playlist.tracks.map((track) => {
              return (
                <div className='playlist-track-text'>
                  <p>
                    <span className='playlist-leftstr'>{playlist.tracks.indexOf(track)+1}.{track.artists.map((artist) => artist.label).join(' ')} - {' '}
                    {track.label}</span>
                    <span className='playlist-rightstr'>album{':'} {track.album.label}</span>
                  </p>
                  <p>
                    <span className='playlist-leftstr'>Duration: {convertDuration(track.duration_ms)}</span>
                    <span className='playlist-rightstr'>Explicit: {track.explicit ? 'Yes' : 'No'}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
