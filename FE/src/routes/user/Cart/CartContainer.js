import React, { useState, useEffect, useCallback } from 'react';
import CartPresenter from './CartPresenter';
import { useCart } from '../../../utils/hooks';

const CartContainer = () => {
  const handleCart = useCart([
    { menuName: '아메리카노', menuId: 1, menuPrice: 1000 },
    { menuName: '아포카도', menuId: 2, menuPrice: 1000 },
    { menuName: '카페라떼', menuId: 3, menuPrice: 3000 },
  ]);
  const [checkedItem, setCheckedItem] = useState([]);

  return (
    <CartPresenter
      handleCart={handleCart}
      handleCheckedCart={{ checkedItem, setCheckedItem }}
    />
  );
};

export default CartContainer;
