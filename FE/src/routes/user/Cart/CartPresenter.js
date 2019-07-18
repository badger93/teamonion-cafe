import React from 'react';
import propTypes from 'prop-types';
import CartForm from '../../../components/CartForm';

const CartPresenter = ({ cart, setStateCart }) => {
  return (
    <div className="cart-wrapper">
      <div className="cart-title">장바구니</div>
      <CartForm cart={cart} setStateCart={setStateCart} />
    </div>
  );
};

CartPresenter.propTypes = {};

export default CartPresenter;
