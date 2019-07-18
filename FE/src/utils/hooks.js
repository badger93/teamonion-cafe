import { useState } from 'react';

export const useCart = (initCart) => {
  const [cart, setStateCart] = useState(initCart);

  const setAllCart = (newCart) => {
    setStateCart(newCart);
    // 여기에 로컬 스토리지 업데이트
  };

  return { cart, setAllCart };
};
