import { convertDuration } from "../utils";


const TrackInfo = ({ track }) => {
  // const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
  // styles are in app styles.
  return (
    <div className="item-page-content">
      <div className="item-page-title">
        <p>
          Currently viewing {track.type} {track.label} by{' '}
          {track.artists.map((artist) => artist.label).join(' ')}
        </p>
      </div>
      <div className="item-page-details">
        <p>Explicit: {track.explicit ? 'Yes' : 'No'}</p>
        <p>Duration {convertDuration(track.duration_ms)}</p>
        <p>From album {track.album.label}</p>
        <p>Album was released at {track.album.release_date}</p>
      </div>
      <div className="item-page-images">
        <img
          src={track.album.images[1].url}
          height={track.album.images[1].height}
          width={track.album.images[1].width}
          alt="album-cover"
        ></img>
        <p>Album cover</p>
      </div>
    </div>
  );
};

export default TrackInfo;
