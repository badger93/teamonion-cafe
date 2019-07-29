/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import '../styles/MenuListItem.scss';

const MenuListItem = ({ item, mapDetailData, setIsMenuPopup }) => {
  const { name, price, imageFile } = item;

  return (
    <div
      className="menuListItem"
      onClick={() => {
        mapDetailData(item);
        setIsMenuPopup(true);
      }}
    >
      <div className="img-area">
        <img src={imageFile} alt="상품이미지" />
      </div>
      <div className="info-area">
        <div className="title">{name}</div>
        <div className="price">{`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>{' '}
        {/* 숫자에 콤마찍는 정규식 */}
      </div>
    </div>
  );
};

MenuListItem.defaultProps = {
  item: {},
  mapDetailData: () => {},
  setIsMenuPopup: () => {},
};

MenuListItem.propTypes = {
  item: propTypes.shape({
    name: propTypes.string,
    price: propTypes.number,
    imageFile: propTypes.string,
  }),
  mapDetailData: propTypes.func,
  setIsMenuPopup: propTypes.func,
};

export default MenuListItem;
