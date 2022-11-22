import LiveSearch from '../components/live-search/search-component';

export function SearchPage() {
  return (
    <div className="search-page-wrapper">
      <div className='search-page-title'>
        <p>Type to search...</p>
      </div>
        <LiveSearch></LiveSearch>
    </div>
  );
}

export default SearchPage;
