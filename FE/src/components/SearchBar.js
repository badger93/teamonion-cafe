import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import '../styles/SearchBar.scss';

const SearchBar = ({ searchCallback }) => {
  const [searchText, setSearchText] = useState('');

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      searchCallback(searchText);
    },
    [searchText],
  );

  return (
    <form
      className="searchArea"
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
  );
};

SearchBar.defaultProps = {
  searchCallback: () => {},
};

SearchBar.propTypes = {
  searchCallback: propTypes.func,
};

export default SearchBar;
