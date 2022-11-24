import { useState } from 'react';

export function SearchWebPage() {
  const urlToLogin = 'http://localhost:4200/api/login';

  const [buttonState, setButtonState] = useState('');
  const [isSearchingEnabled, setSearchingState] = useState(false);

  function onUnlockButtonClick() {
    setSearchingState(true);
    setButtonState('disabled');

    window.open(urlToLogin, '_blank');

    console.log(isSearchingEnabled);
  }

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
    </div>
  );
}

export default SearchWebPage;
