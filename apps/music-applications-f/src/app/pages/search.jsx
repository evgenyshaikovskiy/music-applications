import LiveSearch from '../components/live-search/search-component';
import { Strategy } from '../utility/parsing-strategy';
import AppModal from '../utility/modal';
import { useState } from 'react';
import axios from 'axios';
import DatabaseItemPage from '../utility/database-pages/item-view';

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

  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  // callbacks to pass
  function callbackOnInstanceClick(instance) {
    axios
      .get(
        `http://localhost:4200/api/node-relation/${instance.type[0]}/${instance.label}`
      )
      .then((response) => {
        setSelectedItem(Strategy.ParseGraphObjWithRelations(response.data));
        console.log(selectedItem);
      });

    setModal(true);
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
      <div>
        <AppModal visible={modal} setVisible={setModal} notHideOnClick={false}>
          {/* Write Classes That decompose item */}
          <DatabaseItemPage item={selectedItem}></DatabaseItemPage>
        </AppModal>
      </div>
    </div>
  );
}

export default SearchPage;
