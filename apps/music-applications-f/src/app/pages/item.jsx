import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TrackInfo from '../utility/pages/track-info';
import { Strategy } from '../services/parsing-strategy';
import { ResponseParser } from '../services/response-parser';
import AlbumInfo from '../utility/pages/album-info';
import ArtistInfo from '../utility/pages/artist-info';
import PlaylistInfo from '../utility/pages/playlist-info';

function ItemPage() {
  const router = useNavigate();
  const params = useParams();

  const [item, setItem] = useState({});

  const recognizeParsingStrategy = (type) => {
    switch (type) {
      case 'track':
        return Strategy.ParseSpotifyTrack;
      case 'artist':
        return Strategy.ParseSpotifyArtist;
      case 'album':
        return Strategy.ParseSpotifyAlbum;
      case 'playlist':
        return Strategy.ParseSpotifyPlaylist;
      default:
        return undefined;
    }
  };

  const parsingStrategy = recognizeParsingStrategy(params.type);

  useEffect(() => {
    axios
      .get(`http://localhost:4200/api/${params.type}/${params.id}`)
      .then((response) => {
        setItem(
          ResponseParser.parseResponseData(response.data, parsingStrategy)
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, params.type]);

  return (
    <div className="item-page-wrapper">
      <div className="item-page-btns">
        <button onClick={() => router(-1)} className="go-back-btn">
          Back
        </button>
        <button className="save-to-db-btn" onClick={() => console.log(item)}>
          Save to db
        </button>
      </div>
      {item.type === 'track' ? (
        <TrackInfo track={item}></TrackInfo>
      ) : (
        <div></div>
      )}
      {item.type === 'album' ? (
        <AlbumInfo album={item}></AlbumInfo>
      ) : (
        <div></div>
      )}
      {item.type === 'playlist' ? (
        <PlaylistInfo playlist={item}></PlaylistInfo>
      ) : (
        <div></div>
      )}
      {item.type === 'artist' ? (
        <ArtistInfo artist={item}></ArtistInfo>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ItemPage;
