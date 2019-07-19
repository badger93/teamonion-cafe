import React, { useState, useEffect } from 'react';
import CartPresenter from './CartPresenter';
import { useCart, useLocalStorage } from '../../../utils/hooks';

const CartContainer = () => {
  const cartLocalStorage = useLocalStorage('CART', []);

  useEffect(() => {
    cartLocalStorage.setValue([
      { menuName: '아메리카노', menuId: 1, menuPrice: 1000 },
      { menuName: '아포카도', menuId: 2, menuPrice: 1000 },
      { menuName: '카페라떼', menuId: 3, menuPrice: 3000 },
    ]);
  }, []);

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
