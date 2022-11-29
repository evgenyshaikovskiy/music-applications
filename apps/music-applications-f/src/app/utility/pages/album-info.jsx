import { convertDuration } from "../utils";

const AlbumInfo = ({ album }) => {
  return (
    <div className="item-page-content">
      <div className="item-page-title">
        <p>
          Currently viewing {album.type} {album.label} by{' '}
          {album.artist.map((artist) => artist.label).join(' ')}
        </p>
      </div>
      <div className="item-page-details">
        <p>Album label: {album.actual_label}</p>
        <p>Album was released at {album.release_date}</p>
        <p>Number of tracks in album is {album.tracks_num}</p>
        <p>
          Featured tracks:{' '}
          {album.tracks.map((track) => {
            return (
              <div>
                <p>
                  {track.artists.map((artist) => artist.label).join(' ')} -{' '}
                  {track.label}
                </p>
                <p>Duration: {convertDuration(track.duration_ms)}</p>
                <p>Explicit: {track.explicit ? 'Yes' : 'No'}</p>
                <p>Track order number: {track.track_num}</p>
              </div>
            );
          })}
        </p>
      </div>
      <div className="item-page-images">
        <img
          src={album.images[1].url}
          height={album.images[1].height}
          width={album.images[1].width}
          alt="album-cover"
        ></img>
        <p>Album cover</p>
      </div>
    </div>
  );
};

export default AlbumInfo;
