import React from 'react';
import '../styles/CartForm.scss';
import CartListItem from './CartListItem';

const CartForm = () => {
  return (
    <div className="cartform-container">
      <div className="cartform-title">내역</div>
      <form action="submit" className="cartform">
        <div className="cartform-list">
          <CartListItem />
          <CartListItem />
          <CartListItem />
          <CartListItem />
        </div>

        <div className="cartform-total">
          <div>총결제액</div>
          <div className="cartform-total-price">4000</div>
        </div>
        <button>결제하기</button>
      </form>
    </div>
  );
};

export default CartForm;
