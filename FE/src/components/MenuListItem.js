/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import '../styles/MenuListItem.scss';
import { openPopup } from '../utils/popup';

const MenuListItem = ({ item, mapDetailData, detailRef }) => {
  const { name, price, imageFile } = item;

  return (
    <div
      className="menuListItem"
      onClick={() => {
        mapDetailData(item);
        openPopup(detailRef.current);
      }}
    >
      <div className="img-area">
        <img src={imageFile} alt="상품이미지" />
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
  detailRef: {},
};

MenuListItem.propTypes = {
  item: propTypes.objectOf(
    propTypes.oneOfType([propTypes.number, propTypes.string]),
  ),
  mapDetailData: propTypes.func,
  detailRef: propTypes.objectOf(propTypes.instanceOf(Element)),
};

export default MenuListItem;
