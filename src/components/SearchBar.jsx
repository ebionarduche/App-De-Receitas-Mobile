import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';

function SearchBar() {
  const {
    searchApi,
  } = useContext(SearchContext);

  const searchHandle = () => {
    const searchInput = document.querySelector('input[name=\'search\']:checked').value;
    const searchWord = document.querySelector('input[name=\'searchWord\']').value;

    console.log(searchInput);
    switch (searchInput) {
    case 'ingredient':
      searchApi(`filter.php?i=${searchWord}`);
      break;
    case 'name':
      searchApi(`search.php?s=${searchWord}`);
      break;
    case 'first-letter':
      if (searchWord.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else { searchApi(`search.php?f=${searchWord}`); }
      break;
    default:
      return '';
    }
  };

  return (
    <div>
      <input
        type="text"
        name="searchWord"
        id=""
        data-testid="search-input"
      />
      <input
        type="radio"
        name="search"
        value="ingredient"
        data-testid="ingredient-search-radio"
      />
      <input
        type="radio"
        name="search"
        value="name"
        data-testid="name-search-radio"
      />
      <input
        type="radio"
        name="search"
        value="first-letter"
        data-testid="first-letter-search-radio"
      />
      <button
        data-testid="exec-search-btn"
        onClick={ searchHandle }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
