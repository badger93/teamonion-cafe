import React from 'react';
import propTypes from 'prop-types';
import MenuListItem from '../../../components/MenuListItem';
import MenuDetail from '../../../components/MenuDetail';
import './style/MainPresenter.scss';

const MainPresenter = ({ list, mapDetailData, menuDetailData }) => {
  // 메뉴 리스트 뿌리기
  const mapMenuListItem = list.map((item, index) => (
    <MenuListItem
      // eslint-disable-next-line react/no-array-index-key
      key={`item-${index}`}
      item={item}
      mapDetailData={mapDetailData}
    />
  ));

  return (
    <div className="mainPresenter">
      <h1>MENU</h1>
      <div className="menulist">{mapMenuListItem}</div>
      <MenuDetail menuDetailData={menuDetailData} />
    </div>
  );
};

MainPresenter.defaultProps = {
  list: [],
  mapDetailData: () => {},
  menuDetailData: [],
};

MainPresenter.propTypes = {
  list: propTypes.arrayOf(propTypes.object),
  mapDetailData: propTypes.func,
  menuDetailData: propTypes.arrayOf(),
};

export default MainPresenter;
