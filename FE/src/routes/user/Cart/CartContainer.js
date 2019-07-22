import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartPresenter from './CartPresenter';
import { useCart, useLocalStorage } from '../../../utils/cart';

const CartContainer = () => {
  const cartLocalStorage = useLocalStorage('CART', []);
  const handleCart = useCart(cartLocalStorage.storedValue, cartLocalStorage);
  const [checkedItem, setCheckedItem] = useState([]);
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector(state => state.user);

  return (
    <CartPresenter
      handleCart={handleCart}
      handleCheckedCart={{ checkedItem, setCheckedItem }}
      dispatch={dispatch}
      isSignedIn={isSignedIn}
    />
  );
};

export default CartContainer;
