import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import CartPresenter from './CartPresenter';
import { useCart, useLocalStorage } from '../../../utils/cart';

const CartContainer = () => {
  const cartLocalStorage = useLocalStorage('CART', []);
  const handleCart = useCart(cartLocalStorage.storedValue, cartLocalStorage);
  const [checkedItem, setCheckedItem] = useState([]);
  const dispatch = useDispatch();
  return (
    <CartPresenter
      handleCart={handleCart}
      handleCheckedCart={{ checkedItem, setCheckedItem }}
      dispatch={dispatch}
    />
  );
};

export default CartContainer;
