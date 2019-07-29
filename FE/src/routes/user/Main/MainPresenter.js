import React, { useState } from 'react';
import propTypes from 'prop-types';
import MenuListItem from '../../../components/MenuListItem';
import MenuDetail from '../../../components/MenuDetail';
import './styles/MainPresenter.scss';
import Loading from '../../../components/Loading';

const MainPresenter = ({ isLoading, list, mapDetailData, menuDetailData }) => {
  const [isMenuPopup, setIsMenuPopup] = useState(false);
  // 메뉴 리스트 뿌리기
  const mapMenuListItem = list.map((item, index) => (
    <MenuListItem
      // eslint-disable-next-line react/no-array-index-key
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
        <h1>MENU</h1>
        <div className="menulist">{mapMenuListItem}</div>
        {isMenuPopup && (
          <div className="menuDetailContainer">
            <MenuDetail menuDetailData={menuDetailData} setIsMenuPopup={setIsMenuPopup} />
          </div>
        )}
      </div>
    </>
  );
};

MainPresenter.defaultProps = {
  list: [],
  mapDetailData: () => {},
  menuDetailData: {},
};

MainPresenter.propTypes = {
  isLoading: propTypes.bool.isRequired,
  list: propTypes.arrayOf(propTypes.object),
  mapDetailData: propTypes.func,
  menuDetailData: propTypes.shape({
    deleted: propTypes.bool,
    id: propTypes.number,
    imagePath: propTypes.string,
    information: propTypes.string,
    name: propTypes.string,
    price: propTypes.number,
  }),
};

export default MainPresenter;
