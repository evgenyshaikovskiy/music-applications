import { convertDuration } from '../utils';

const PlaylistInfo = ({ playlist }) => {
  return (
    <div className="item-page-content">
      <div className="item-page-title">
        <p>
          Currently viewing {playlist.type} {playlist.name}
        </p>
      </div>
      <div className="item-page-details">
        <p>Playlist is {playlist.collaborative ? '' : 'not'} collaborative</p>
        <p>Playlist contains {playlist.tracks.length} tracks</p>
        <p>
          Featured tracks:
          {/* needs to be fixed by giving key props for each child */}
          {playlist.tracks.map((track, index) => {
            return (
              <PlaylistTrackInfo track={track} key={index}/>
            );
          })}
        </p>
      </div>
      <div className="item-page-details">
        <img
          src={playlist.images[0].url}
          height={playlist.images[0].height}
          width={playlist.images[0].width}
          alt="playlist-cover"
        ></img>
        <p>Playlist cover</p>
      </div>
    </div>
  );
};

const PlaylistTrackInfo = ({ track }) => {
  return (
    <div>
      {track.artists.map((artist) => artist.label).join(' ')} - {' '}
      {track.label} album {track.album.label}
      Duration: {convertDuration(track.duration_ms)}
      Explicit: {track.explicit ? 'Yes' : 'No'}
    </div>
  );
};

export default PlaylistInfo;
