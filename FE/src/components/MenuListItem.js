/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import '../styles/MenuListItem.scss';

const MenuListItem = ({ item, mapDetailData }) => {
  const { name, price, imagePath } = item;

  const showPopup = () => {
    const popup = document.querySelector('.menuDetail');
    popup.style.display = 'block';
    popup.style.left = `${(window.innerWidth - 650) / 2}px`;
    popup.style.top = `${(window.innerHeight - 350) / 2}px`;
  };

  return (
    <div
      className="menuListItem"
      onClick={() => {
        mapDetailData(item);
        showPopup();
      }}
    >
      <div className="img-area">
        <img src={imagePath} alt="상품이미지" />
      </div>
      <div className="info-area">
        <p className="title">{name}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  );
};

MenuListItem.defaultProps = {
  item: {},
  mapDetailData: () => {},
};

MenuListItem.propTypes = {
  item: propTypes.objectOf(
    propTypes.oneOfType([propTypes.number, propTypes.string]),
  ),
  mapDetailData: propTypes.func,
};

export default MenuListItem;
