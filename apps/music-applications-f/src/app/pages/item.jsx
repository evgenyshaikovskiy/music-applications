import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Strategy } from '../services/parsing-strategy';
import { ResponseParser } from '../services/response-parser';

function ItemPage() {
  const router = useNavigate();
  const params = useParams();

  const [item, setItem] = useState({ });

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
        setItem({
          ...item,
          ...ResponseParser.parseResponseData(response.data, parsingStrategy),
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, params.type]);

  return (
    <div className="item-page-wrapper">
      <div className="item-page-btns">
        <button onClick={() => router(-1)} className="go-back-btn">
          Back
        </button>
        <button className="save-to-db-btn">Save to db</button>
      </div>
      <div className="item-page-content">

      </div>
    </div>
  );
}

export default ItemPage;
