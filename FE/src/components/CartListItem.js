import React, { useEffect } from 'react';
import '../styles/CartListItem.scss';
import propTypes from 'prop-types';

const CartListItem = ({
  cartId = 0,
  menuName = 'none',
  menuPrice = 0,
  cart,
  setAllCart,
  checkedItem,
  setCheckedItem,
}) => {
  const DeleteItem = () => {
    const deleteIndex = cart.findIndex(element => element.cartId === cartId);
    // 체크해놓고 삭제시 처리

    const validator = checkedItem.findIndex(
      element => element.cartId === cart[deleteIndex].cartId,
    );

    if (validator !== -1) { // 삭제시 체크된 목록에서도 같이삭제
      checkedItem.splice(validator, 1);
      setCheckedItem([...checkedItem]);
    }

    cart.splice(deleteIndex, 1);
    setAllCart([...cart]); // State 와 로컬스토리지 동시 변경
  };

  const Checked = (e) => {
    const checkedIndex = cart.findIndex(element => element.cartId === cartId);

    const validator = checkedItem.findIndex(
      element => element.cartId === cart[checkedIndex].cartId,
    );

    if (validator !== -1) {
      // 이미 있을경우 삭제
      //   const deleteCheckedIndex = checkedItem.findIndex(
      //     (element) => element === cartId,
      //   );
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
  cartId: propTypes.number.isRequired,
  menuName: propTypes.string,
  menuPrice: propTypes.number,
  cart: propTypes.array,
  setAllCart: propTypes.func,
  checkedItem: propTypes.array,
  setCheckedItem: propTypes.func,
};

export default CartListItem;
