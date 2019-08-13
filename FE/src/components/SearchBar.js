import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.scss';

const SearchBar = ({ searchCallback }) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 특수문자있는지 체크
  const isSpecial = str => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    return reg.test(str);
  };

  // 문자 좌우 공백 제거
  const trimStr = str => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      if (!isSpecial) {
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
