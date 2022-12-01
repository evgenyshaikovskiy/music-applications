const ArtistInfo = ({ artist }) => {
  console.log(artist);
  // fetch all playlist? ??? ? ?
  return (
    <div className="item-page-content">
      <div className="item-page-title">
        <p>
          {' '}
          Currently viewing {artist.type} {artist.label}
        </p>
      </div>
      <div className="item-page-details">
        <p>Artist performs in these genres: {artist.genres.join(', ')}</p>
      </div>
      <div className="item-page-images">
        {artist.images[1] ? (
          <img
            src={artist.images[1].url}
            height={artist.images[1].height}
            width={artist.images[1].width}
            alt="artist-cover"
          ></img>
        ) : (
          <div></div>
        )}
        <p>Artist image</p>
      </div>
    </div>
  );
};

export default ArtistInfo;
