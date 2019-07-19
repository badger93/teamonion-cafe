import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CartPresenter from './CartPresenter';
import { useCart, useLocalStorage } from '../../../utils/hooks';
import { PAY_REQUEST } from '../../../redux/actions/payAction';

const CartContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAY_REQUEST });
  }, []);

  const cartLocalStorage = useLocalStorage('CART', []);
  const handleCart = useCart(cartLocalStorage.storedValue, cartLocalStorage);
  const [checkedItem, setCheckedItem] = useState([]);

  return (
    <CartPresenter
      handleCart={handleCart}
      handleCheckedCart={{ checkedItem, setCheckedItem }}
    />
  );
};

export default CartContainer;
