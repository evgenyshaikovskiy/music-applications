import ApplicationButton from '../components/ui-elements/button';
import ApplicationInput from '../components/ui-elements/input';
import LiveSearch from '../components/live-search/search-component';

export function SearchPage() {
  return (
    <div className="search-page-wrapper">
      <div>
        <LiveSearch></LiveSearch>
      </div>
    </div>
  );
}

export default SearchPage;
