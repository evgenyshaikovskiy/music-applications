import LiveSearch from '../components/live-search/search-component';
import { Strategy } from '../services/parsing-strategy';

export function SearchPage() {
  // props to pass
  const selectorParamsArray = [
    { value: 'artist', name: 'Artists' },
    { value: 'track', name: 'Tracks' },
    { value: 'genre', name: 'Genres' },
    { value: 'album', name: 'Albums' },
    { value: 'playlist', name: 'Playlist' },
  ];
  const endpointUrl = 'http://localhost:4200/api/search?';
  const parsingStrategy = Strategy.ParseGraphDbObj;
  const searchWordInitialState = 'All';

  // callbacks to pass
  function callbackOnInstanceClick(instance) {
    console.log(`callback for this ${instance}`);
  }

  return (
    <div className="search-page-wrapper">
      <div className="search-page-title">
        <p>Type to search from graph database...</p>
      </div>
      <LiveSearch
        isInputDisabled={false}
        selectorParamsArray={selectorParamsArray}
        instanceClickCallback={callbackOnInstanceClick}
        isSelectorDefaultValueDisabled={false}
        defaultSelectorValue={searchWordInitialState}
        searchWordInitialState={searchWordInitialState}
        endpointUrl={endpointUrl}
        parsingStrategy={parsingStrategy}
        selectorClassName="livesearch-selector"
      ></LiveSearch>
    </div>
  );
}

export default SearchPage;
