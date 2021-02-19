import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Artists from './Artists';

// App architecture via SearchPage, Artists, and SearchBar Components
// inspired by an article from Praditiya Adhitana:
// https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d

const SearchPage = (props) => {
  const [input, setInput] = useState(''); // credit: Praditiya Adhitana
  const [artists, setArtists] = useState(); // credit: Praditiya Adhitana

  // POST function, update list of artists to display based on query
  const handleSubmit = async e => {
    e.preventDefault();
    fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: input }),
    }).then((response) => {
        response.json().then(data => ({
        data:data
      })).then(res => {
        setArtists(res.data.map((a) => a.artist).slice(0, 10));
      })
    });
  };

  // update content in search box. credit: Praditiya Adhitana
  const updateInput = async (input) => {
    setInput(input);
  }


  return (
    <>
      <h1 style={{fontSize: 25, fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'}}>Our Bands</h1>
      <SearchBar
       input={input}
       onChange={updateInput}
      />
    <button
      type="button"
      onClick={handleSubmit}
      style={{height: 31, backgroundColor: 'black', borderColor: 'black', borderRadius: 4, outlineColor: '#D1D1D1', fontWeight: 'bold', fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji', color: 'white'}}
      >
        SEARCH
      </button>
      {artists !== ''? <Artists artists={artists}/> : null}
    </>
   );
}

export default SearchPage
