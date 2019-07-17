/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import '../styles/MenuListItem.scss';

const MenuListItem = (props) => {
  const {
    item: { name, price, imagePath },
  } = props;
  const { item, mapDetailData } = props;

  const popup = document.querySelector('.menuDetail');
  const popupWidth = popup.style.width;
  const popupHeight = popup.style.height;
  const popupLeft = (window.innerWidth - popupWidth) / 2;
  const popupTop = (window.innerHeight - popupHeight) / 2;

  const showPopup = (left, top) => {
    popup.style.display = 'block';
    popup.style.left = left;
    popup.style.top = top;
  };

  return (
    <div
      className="menuListItem"
      onClick={() => {
        mapDetailData(item);
        showPopup(popupLeft, popupTop);
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
