import React, { useEffect } from 'react';
import '../styles/CartListItem.scss';
import propTypes from 'prop-types';

const CartListItem = ({
  menuId = 0,
  menuName = 'none',
  menuPrice = 0,
  cart,
  setAllCart,
}) => {
  const DeleteItem = () => {
    const deleteIndex = cart.findIndex((element) => element.menuId === menuId);
    const changedCart = cart;
    const deletedCart = cart.splice(deleteIndex, 1);

    setAllCart([...changedCart]);
  };

  return (
    <div className="cartform-list-item">
      <div className="cart-item-column">
        <label htmlFor={`${menuId}`} className="cartform-list-item-name">
          <input id={`${menuId}`} type="checkbox" />
          {`${menuName}`}
        </label>
      </div>
      <div className="cart-item-column">
        <div>{`${menuPrice}`}</div>
        <button
          type="button"
          className="cartform-item-delete"
          onClick={DeleteItem}
        >
          <span>❌</span>
        </button>
      </div>
    </div>
  );
};

CartListItem.propTypes = {
  menuId: propTypes.number.isRequired,
  menuName: propTypes.string,
  menuPrice: propTypes.number,
};

export default CartListItem;
