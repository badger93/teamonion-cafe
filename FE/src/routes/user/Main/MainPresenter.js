import React, { useState } from 'react';
import propTypes from 'prop-types';
import MenuListItem from '../../../components/MenuListItem';
import MenuDetail from '../../../components/MenuDetail';
import './styles/MainPresenter.scss';
import Loading from '../../../components/Loading';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';

const MainPresenter = ({
  isLoading,
  list,
  mapDetailData,
  menuDetailData,
  searchMenuListByName,
  menuPageData,
  getMenuByPage,
}) => {
  const [isMenuPopup, setIsMenuPopup] = useState(false);
  // 메뉴 리스트 뿌리기
  const mapMenuListItem = list.map((item, index) => (
    <MenuListItem
      key={`item-${index}`}
      item={item}
      mapDetailData={mapDetailData}
      setIsMenuPopup={setIsMenuPopup}
    />
  ));

  return (
    <>
      {isLoading && <Loading />}
      <div className="mainPresenter">
        <div className="head">
          <h1>MENU</h1>
          <SearchBar searchCallback={searchMenuListByName} />
        </div>
        <div className="menulist">{mapMenuListItem}</div>
        {isMenuPopup && (
          <div className="menuDetailContainer">
            <MenuDetail menuDetailData={menuDetailData} setIsMenuPopup={setIsMenuPopup} />
          </div>
        )}
        <Pagination
          pageData={menuPageData}
          maxIndex={8}
          callback={e => {
            getMenuByPage({ itemSize: 20, page: e.target.value - 1 });
          }}
        />
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
};

MainPresenter.propTypes = {
  isLoading: propTypes.bool.isRequired,
  list: propTypes.arrayOf(propTypes.object),
  mapDetailData: propTypes.func,
  menuDetailData: propTypes.objectOf(propTypes.string),
  searchMenuListByName: propTypes.func,
  menuPageData: propTypes.objectOf(),
  getMenuByPage: propTypes.func,
};

export default MainPresenter;
