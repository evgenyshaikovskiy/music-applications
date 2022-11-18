import axios from 'axios';
import { useEffect, useState } from 'react';
import ApplicationInput from '../ui-elements/input';

export function LiveSearch() {
  const [result, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // use call
      if (query != '') {
        axios
          .get(`http://localhost:4200/api/search?word=${query.toLowerCase()}`)
          .then((response) => {
            console.log(
              response.data.records.map((value) => value['_fields'][0])
            );
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <div>
      <ApplicationInput
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      ></ApplicationInput>
    </div>
  );
}

export default LiveSearch;
