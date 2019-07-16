import React from 'react';
import propTypes from 'prop-types';

const MenuListItem = (props) => {
  const {
    item: {
 name, price, information, imagePath 
},
  } = props;

  return (
    <div className="menuListItem">
      <div className="img-area">
        <img src={imagePath} alt="상품이미지" />
      </div>
      <div className="info-area">
        <p>{name}</p>
        <p>{price}</p>
        <p>{information}</p>
      </div>
    </div>
  );
};

MenuListItem.defaultProps = {
  item: {},
};

MenuListItem.propTypes = {
  item: propTypes.objectOf(
    propTypes.oneOfType([propTypes.number, propTypes.string]),
  ),
};

export default MenuListItem;
