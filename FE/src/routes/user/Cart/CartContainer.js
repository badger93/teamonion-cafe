import React, { useState } from 'react';
import CartPresenter from './CartPresenter';
import { useCart, useLocalStorage } from '../../../utils/cart';


const CartContainer = () => {
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
