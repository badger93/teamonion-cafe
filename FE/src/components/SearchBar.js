import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.scss';

const SearchBar = ({ searchCallback }) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      searchCallback(searchText);
    },
    [searchText, searchCallback],
  );

  return (
    <>
      {isSearchOpen ? (
        <form
          className="SearchBar"
          onSubmit={e => {
            if (submitCallback !== undefined) {
              submitCallback(e);
            }
          }}
        >
          <input
            className="searchText"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            type="text"
            placeholder="검색어를 입력해주세요"
          />
          <input className="searchSubmit" value="검색" type="submit" />
        </form>
      ) : (
        <h1 className="searchGlass" onClick={() => setIsSearchOpen(prev => !prev)}>
          <FontAwesomeIcon icon={faSearch} />
        </h1>
      )}
    </>
  );
};

SearchBar.defaultProps = {
  searchCallback: () => {},
};

SearchBar.propTypes = {
  searchCallback: propTypes.func,
};

export default SearchBar;
