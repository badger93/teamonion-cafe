import React, { useState } from 'react';
import propTypes from 'prop-types';
import '../styles/CartForm.scss';
import CartListItem from './CartListItem';

const CartForm = ({ handleCart, handleCheckedCart }) => {
  const { cart, setAllCart } = handleCart;
  const { checkedItem, setCheckedItem } = handleCheckedCart;
  let totalPrice = 0;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="cartform-container">
      <div className="cartform-title">내역</div>
      <form action="submit" className="cartform">
        <div className="cartform-list">
          {cart.map(item => (
            <CartListItem
              key={item.menuId}
              menuId={item.menuId}
              menuName={item.menuName}
              menuPrice={item.menuPrice}
              cart={cart}
              setAllCart={setAllCart}
              checkedItem={checkedItem}
              setCheckedItem={setCheckedItem}
            />
          ))}
        </div>

        <div className="cartform-total">
          <div>총결제액</div>
          <div className="cartform-total-price">
            {checkedItem.forEach((element) => {
              totalPrice += element.menuPrice;
            })}
            {`${totalPrice}`}
          </div>
        </div>
        <button type="button" className="submit-button" onSubmit={onSubmit}>
          결제하기
        </button>
      </form>
    </div>
  );
};

CartForm.propTypes = {
  handleCart: propTypes.shape({
    cart: propTypes.array.isRequired,
    setAllCart: propTypes.func.isRequired,
  }).isRequired,
  handleCheckedCart: propTypes.shape({
    checkedItem: propTypes.array.isRequired,
    setCheckedItem: propTypes.func.isRequired,
  }).isRequired,
};

export default CartForm;
