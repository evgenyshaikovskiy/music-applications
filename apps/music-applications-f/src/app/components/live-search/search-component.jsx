import axios from 'axios';
import { useEffect, useState } from 'react';
import { Strategy } from '../../services/parsing-strategy';
import { RequestParser } from '../../services/request-parser';
import ApplicationSelect from '../ui-elements/select';
import InteractiveDropdown from './interactive-dropdown';
import './styles.scss';

// later add default styles by adding module.scss file
// and injecting it into select component
const selectorStyles = {
  border: '0px',
  borderBottom: '3px solid #00b8b8',
  backgroundColor: '#ffffff',
  fontWeight: '500',
  textAlign: 'center',
  fontSize: 'medium',
  paddingLeft: '5px',
  paddingTop: '4px',
  height: '40px',
  width: '100px',
};

export function LiveSearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searchWord, setSearchWord] = useState('all');

  const selectorParamsArray = [
    { value: 'artist', name: 'Artist' },
    { value: 'song', name: 'Song' },
    { value: 'genre', name: 'Genre' },
    { value: 'album', name: 'Album' },
  ];

  // consider refactoring this part
  const searchForAllInstances = 'All';

  useEffect(() => {
    // move request code to different class later
    const searchDelayTimer = setTimeout(() => {
      if (query !== '') {
        axios
          .get(
            `http://localhost:4200/api/search?${searchWord}=${query.toLowerCase()}`
          )
          .then((response) => {
            setResults(
              RequestParser.parseResponseData(
                response.data.records,
                Strategy.ParseNames
              )
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
          defaultValueName={searchForAllInstances}
          defaultValue={searchForAllInstances.toLowerCase()}
          className="livesearch-selector"
          value={searchWord}
          onChange={(value) => setSearchWord(value)}
          styles={selectorStyles}
          options={selectorParamsArray}
        ></ApplicationSelect>
        <input
          className="livesearch-input"
          value={query}
          type="text"
          placeholder='Write your query here'
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
