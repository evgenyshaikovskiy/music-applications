import axios from 'axios';
import { useEffect, useState } from 'react';
import ApplicationSelect from '../ui-elements/select';
import InteractiveDropdown from './interactive-dropdown';
import './styles.scss';

const selectorStyles = {
  border: '0px',
  borderBottom: '3px solid #00b8b8',
  backgroundColor: '#ffffff',
  fontWeight: '500',
  textAlign: 'center',
  fontSize: 'medium',
  paddingLeft: '5px',
  paddingTop: '2px',
};

export function LiveSearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searchWord, setSearchWord] = useState('');

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
    }, 300);

    return () => clearTimeout(searchDelayTimer);
  }, [query, searchWord]);

  function callback(item) {
    console.log(`callback for this ${item}`);
    console.log(searchWord);
  }

  return (
    <div className="livesearch-wrapper">
      <div className="livesearch-input-container">
        <ApplicationSelect
          className="livesearch-selector"
          value={searchWord}
          defaultValue="Select instance to search"
          isDefaultDisabled={false}
          onChange={(value) => setSearchWord(value)}
          styles={selectorStyles}
          options={[
            { value: 'Bebra', name: 'Bebra' },
            { value: 'Name', name: 'Name' },
            { value: 'song', name: 'song' },
          ]}
        ></ApplicationSelect>
        <input
          className="livesearch-input"
          value={query}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      {query !== '' ? (
        <div className="dropdown-container">
          <InteractiveDropdown
            onClickCallback={callback}
            list={results}
          ></InteractiveDropdown>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LiveSearch;
