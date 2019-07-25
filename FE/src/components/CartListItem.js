import React from 'react';
import '../styles/CartListItem.scss';
import propTypes from 'prop-types';
import { CartDelete } from '../utils/cart';

const CartListItem = ({
  cartId = 0,
  menuName = 'none',
  menuPrice = 0,
  cart,
  setAllCart,
  checkedItem,
  setCheckedItem,
}) => {
  const Checked = e => {
    const checkedIndex = cart.findIndex(element => element.cartId === cartId);

    // 있는지 없는지 검사
    const validator = checkedItem.findIndex(
      element => element.cartId === cart[checkedIndex].cartId,
    );

    if (validator !== -1) {
      // 이미 있을경우 삭제
      checkedItem.splice(validator, 1);
      setCheckedItem([...checkedItem]);
    } else {
      // 없을 경우 추가
      setCheckedItem([...checkedItem, { ...cart[checkedIndex] }]);
    }
  };

  return (
    <div className="cartform-list-item">
      <div className="cart-item-column">
        <label htmlFor={`${cartId}`} className="cartform-list-item-name">
          <input id={`${cartId}`} type="checkbox" onClick={Checked} />
        </label>
      </div>
      <div className="cart-item-column">{`${menuName}`}</div>
      <div className="cart-item-column">
        <div>{`${menuPrice}`}</div>{' '}
      </div>
      <div className="cart-item-column">
        <button
          type="button"
          className="cartform-item-delete"
          onClick={() => CartDelete(cart, setAllCart, cartId, checkedItem, setCheckedItem)}
        >
          <span>삭제</span>
        </button>
      </div>
    </div>
  );
};

CartListItem.propTypes = {
  cartId: propTypes.number.isRequired,
  menuName: propTypes.string,
  menuPrice: propTypes.number,
  cart: propTypes.array,
  setAllCart: propTypes.func,
  checkedItem: propTypes.array,
  setCheckedItem: propTypes.func,
};

export default CartListItem;
