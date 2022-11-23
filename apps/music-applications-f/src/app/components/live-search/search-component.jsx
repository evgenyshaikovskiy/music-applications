import axios from 'axios';
import { useEffect, useState } from 'react';
import InteractiveDropdown from './interactive-dropdown';
import './styles.scss';

export function LiveSearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const searchDelayTimer = setTimeout(() => {
      if (query !== '') {
        axios
          .get(`http://localhost:4200/api/search?word=${query.toLowerCase()}`)
          .then((response) => {
            setResults(
              response.data.records.map((value) => value['_fields'][0])
            );
          });
      }
    }, 500);

    return () => clearTimeout(searchDelayTimer);
  }, [query]);

  return (
    <div className="livesearch-wrapper">
      <div className="livesearch-input-container">
        <input
          className="livesearch-input"
          value={query}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      {query !== '' ? (
        <div className="dropdown-container">
          <InteractiveDropdown list={results}></InteractiveDropdown>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LiveSearch;
