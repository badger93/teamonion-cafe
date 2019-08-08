import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import MenuDetail from './components/MenuDetail';
import './styles/MainPresenter.scss';
import Loading from '../../../components/Loading';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/pagination';
import MenuListItems from './components/MenuListItems';
import UserRank from './components/UserRank';

const MainPresenter = ({
  isLoading,
  list,
  mapDetailData,
  menuDetailData,
  searchMenuListByName,
  menuPageData,
  getMenuByPage,
  searchText,
}) => {
  const [isMenuPopup, setIsMenuPopup] = useState(false);
  // 메뉴 리스트 뿌리기
  // const mapMenuListItem = list.map((item, index) => (
  //   <MenuListItem
  //     key={`item-${index}`}
  //     item={item}
  //     mapDetailData={mapDetailData}
  //     setIsMenuPopup={setIsMenuPopup}
  //   />
  // ));

  const pageCallback = useCallback(
    e => {
      return searchText
        ? searchMenuListByName(searchText, e.target.value - 1)
        : getMenuByPage({ itemSize: 12, page: e.target.value - 1 });
    },
    [getMenuByPage, searchMenuListByName, searchText],
  );
  return (
    <>
      {isLoading && <Loading />}
      <div className="mainPresenter">
        <UserRank />
        <div className="head">
          <h1>MENU</h1>
          <SearchBar searchCallback={searchMenuListByName} />
        </div>
        {/* <div className="menulist">{mapMenuListItem}</div> */}
        <MenuListItems list={list} mapDetailData={mapDetailData} setIsMenuPopup={setIsMenuPopup} />
        {isMenuPopup && (
          <div className="menuDetailContainer">
            <MenuDetail menuDetailData={menuDetailData} setIsMenuPopup={setIsMenuPopup} />
          </div>
        )}
        <Pagination pageData={menuPageData} maxIndex={8} callback={e => pageCallback(e)} />
      </div>
    </>
  );
};

MainPresenter.defaultProps = {
  list: [],
  mapDetailData: () => {},
  menuDetailData: {},
  searchMenuListByName: () => {},
  menuPageData: {},
  getMenuByPage: () => {},
  searchText: '',
};

MainPresenter.propTypes = {
  isLoading: propTypes.bool.isRequired,
  list: propTypes.arrayOf(propTypes.object),
  mapDetailData: propTypes.func,
  searchMenuListByName: propTypes.func,
  menuPageData: propTypes.shape({
    page: propTypes.number,
    totalPages: propTypes.number,
  }),
  getMenuByPage: propTypes.func,
  menuDetailData: propTypes.shape({
    deleted: propTypes.bool,
    id: propTypes.number,
    imagePath: propTypes.string,
    information: propTypes.string,
    name: propTypes.string,
    price: propTypes.number,
  }),
  searchText: propTypes.string,
};

export default MainPresenter;
