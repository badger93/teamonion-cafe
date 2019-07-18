import React from 'react';
import propTypes from 'prop-types';
import CartForm from '../../../components/CartForm';

const CartPresenter = () => {
  return (
    <div className="cart-wrapper">
      <div className="cart-title">장바구니</div>
      <CartForm />
    </div>
  );
};

CartPresenter.propTypes = {};

export default CartPresenter;
