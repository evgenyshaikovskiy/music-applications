import { useState } from 'react';
import LiveSearch from '../components/live-search/search-component';
import { Strategy } from '../services/parsing-strategy';

export function SearchWebPage() {
  const urlToLogin = 'http://localhost:4200/api/login';

  const [buttonState, setButtonState] = useState('');
  const [isSearchingEnabled, setSearchingState] = useState(false);

  function onUnlockButtonClick() {
    // setSearchingState(true);

    window.open(urlToLogin, '_blank');

    console.log(isSearchingEnabled);
  }

  function callbackOnInstanceClick(instance) {
    console.log(`callback for this ${instance}`);
    console.log(instance);
  }

  const selectorParamsArray = [{ value: 'song', name: 'Song' }];

  return (
    <div className="search-web-page-wrapper">
      <div className="search-web-page-title">
        <p>Type to search from web...</p>
      </div>
      <div className="search-web-conn-block">
        <button onClick={onUnlockButtonClick} disabled={buttonState}>
          Click to unlock searching
        </button>
      </div>
      <LiveSearch
        isInputDisabled={false}
        selectorParamsArray={selectorParamsArray}
        instanceClickCallback={callbackOnInstanceClick}
        isSelectorDefaultValueDisabled={true}
        defaultSelectorValue=""
        searchWordInitialState=""
        endpointUrl="http://localhost:4200/api/web-search?"
        parsingStrategy={Strategy.ParseWebSpotifyObj}
      ></LiveSearch>
    </div>
  );
}

export default SearchWebPage;
