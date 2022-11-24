import axios from 'axios';
import { useEffect, useState } from 'react';
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

export function LiveSearch({
  isInputDisabled,
  isSelectorDefaultValueDisabled,
  selectorParamsArray,
  instanceClickCallback,
  searchWordInitialState,
  endpointUrl,
  parsingStrategy,
}) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searchWord, setSearchWord] = useState(
    searchWordInitialState.toLowerCase()
  );
  const [requestErrorText, setRequestErrorText] = useState('');

  const disableTag = (isDisabled) => (isDisabled ? 'disabled' : '');

  useEffect(() => {
    // move request code to different class later
    const searchDelayTimer = setTimeout(() => {
      if (query !== '' && searchWord !== '') {
        axios.get(`${endpointUrl}${searchWord}=${query.toLowerCase()}`).then(
          (response) => {
            console.log(response);
            setResults(
              RequestParser.parseResponseData(
                response,
                parsingStrategy
              )
            );
          },
          (reason) => {
            setRequestErrorText(reason);
          }
        );
      }
    }, 400);

    return () => clearTimeout(searchDelayTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchWord]);

  // need to style empty divs and when promise is rejected and when result is empty
  return (
    <div className="livesearch-wrapper">
      <div className="livesearch-input-container">
        <ApplicationSelect
          isDefaultDisabled={disableTag(isSelectorDefaultValueDisabled)}
          defaultValueName={searchWordInitialState}
          defaultValue={searchWordInitialState.toLowerCase()}
          className="livesearch-selector"
          value={searchWord}
          onChange={(value) => setSearchWord(value)}
          styles={selectorStyles}
          options={selectorParamsArray}
        ></ApplicationSelect>
        <input
          disabled={disableTag(isInputDisabled)}
          className="livesearch-input"
          value={query}
          type="text"
          placeholder="Write your query here"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      {query !== '' ? (
        <div className="dropdown-container">
          <InteractiveDropdown
            onClickCallback={instanceClickCallback}
            list={results}
          ></InteractiveDropdown>
        </div>
      ) : (
        <div>{requestErrorText}</div>
      )}
    </div>
  );
}

export default LiveSearch;
