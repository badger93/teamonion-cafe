import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.scss';
import { isSpecial, trimStr } from '../utils/validateText';

const SearchBar = ({ searchCallback }) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      if (isSpecial(searchText)) {
        alert('검색어에 특수문자를 포함 할 수 없습니다');
        setSearchText('');
      } else {
        const trimedStr = trimStr(searchText);
        searchCallback(trimedStr);
        setSearchText('');
      }
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
