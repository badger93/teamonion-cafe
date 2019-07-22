import React from 'react';
import propTypes from 'prop-types';
import CartForm from '../../../components/CartForm';
import './styles/CartPresenter.scss';

const CartPresenter = ({ handleCart, handleCheckedCart, dispatch }) => (
  <div className="cart-wrapper">
    <div className="cart-title">장바구니</div>
    <div className="cart-container">
      <CartForm
        handleCart={handleCart}
        handleCheckedCart={handleCheckedCart}
        dispatch={dispatch}
        />
    </div>
  </div>
);

CartPresenter.propTypes = {
  handleCart: propTypes.shape({
    cart: propTypes.array.isRequired,
    setAllCart: propTypes.func.isRequired,
  }).isRequired,
  handleCheckedCart: propTypes.shape({
    checkedItem: propTypes.array.isRequired,
    setCheckedItem: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func,
};

export default CartPresenter;
