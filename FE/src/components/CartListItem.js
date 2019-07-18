import React, { useEffect } from 'react';
import '../styles/CartListItem.scss';
import propTypes from 'prop-types';

const CartListItem = ({
  menuId = 0,
  menuName = 'none',
  menuPrice = 0,
  cart,
  setAllCart,
  checkedItem,
  setCheckedItem,
}) => {
  const DeleteItem = () => {
    const deleteIndex = cart.findIndex((element) => element.menuId === menuId);

    // 체크해놓고 삭제시 처리

    const validator = checkedItem.findIndex(
      (element) => element.menuId === cart[deleteIndex].menuId,
    );

    if (validator !== -1) {
      checkedItem.splice(validator, 1);
      setCheckedItem([...checkedItem]);
    }

    const deletedCart = cart.splice(deleteIndex, 1);
    setAllCart([...cart]);
  };

  const Checked = (e) => {
    const checkedIndex = cart.findIndex((element) => element.menuId === menuId);

    const validator = checkedItem.findIndex(
      (element) => element.menuId === cart[checkedIndex].menuId,
    );

    if (validator !== -1) {
      // 이미 있을경우 삭제
      //   const deleteCheckedIndex = checkedItem.findIndex(
      //     (element) => element === menuId,
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
        <label htmlFor={`${menuId}`} className="cartform-list-item-name">
          <input id={`${menuId}`} type="checkbox" onClick={Checked} />
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
