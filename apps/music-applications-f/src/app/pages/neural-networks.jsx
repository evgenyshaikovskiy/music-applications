import axios from 'axios';
import { useEffect, useState } from 'react';
import './pages.scss';

export function NeuralNetworksPage() {
  const [comment, setComment] = useState('');

  useEffect(() => {
    // add spinner and popup window
    const requestDelay = setTimeout(() => {
      if (comment !== '') {
        axios
          .get(`http://localhost:4200/api/network/comment/${comment}`)
          .then((response) => console.log(response.data, 'received response'));
      }
    }, 1000);

    return () => clearTimeout(requestDelay);
  }, [comment]);
  return (
    <div className="neural-network-page-wrapper">
      <div className="neural-network-fetch-comments-section">
        <input
          type="text"
          className="fetch-comments-input"
          placeholder="Write comment on song"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default NeuralNetworksPage;
