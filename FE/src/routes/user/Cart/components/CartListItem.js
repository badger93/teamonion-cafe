import React from 'react';
import '../styles/CartListItem.scss';
import propTypes from 'prop-types';
import { CartDelete } from '../../../../utils/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
          <input
            className="cart-item-checkbox"
            id={`${cartId}`}
            type="checkbox"
            defaultChecked="checked"
            onClick={Checked}
          />
        </label>
      </div>
      <div className="cart-item-column">{`${menuName}`}</div>
      <div className="cart-item-column">
        <div>{`${menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>{' '}
      </div>
      <div className="cart-item-column">
        <button
          type="button"
          className="cartform-item-delete"
          onClick={() => CartDelete(cart, setAllCart, cartId, checkedItem, setCheckedItem)}
        >
          <span>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </span>
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
