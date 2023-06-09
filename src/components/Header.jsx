import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title, btnProfile, btnSearch }) {
  const [searchBar, SetSearchBar] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  const TogleSearchBar = () => {
    if (searchBar === false) {
      SetSearchBar(true);
    } else {
      SetSearchBar(false);
    }
  };

  return (
    <div className="header-container">
      <h1 data-testid="page-title">{title}</h1>

      {btnProfile && (
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ handleClick }
        >
          <img src={ profileIcon } alt="profile-icon" />
        </button>
      )}

      {btnSearch && (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ TogleSearchBar }
        >
          <img src={ searchIcon } alt="search-icon" />
        </button>
      )}
      {
        searchBar && <SearchBar />
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  btnProfile: PropTypes.bool,
  btnSearch: PropTypes.bool,
}.isRequired;

export default Header;
