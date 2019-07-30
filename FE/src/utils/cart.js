import { useState } from 'react';

// 로컬스토리지, 체크배열, 장바구니배열 삭제기능 함수

export const CartDelete = (array, setArray, cartId, array2 = null, setArray2 = null) => {
  const deleteIndex = array.findIndex(element => element.cartId === cartId);
  // 체크해놓고 삭제시 처리

  if (deleteIndex !== -1) {
    if (array2 && setArray2) {
      const deleteIndexArray2 = array2.findIndex(
        element => element.cartId === array[deleteIndex].cartId,
      );

      if (deleteIndexArray2 !== -1) {
        // 삭제시 체크된 목록에서도 같이삭제
        array2.splice(deleteIndexArray2, 1);
        setArray2([...array2]);
      }
    }
    array.splice(deleteIndex, 1);
    setArray([...array]); // State 와 로컬스토리지 동시 변경
  }
};

// 장바구니 스테이트와 동일시 되게
export const useCart = (initCart, localStorage = null) => {
  const [cart, setStateCart] = useState(initCart);

  const setAllCart = newCart => {
    setStateCart(newCart);
    // 여기에 로컬 스토리지 업데이트
    localStorage && localStorage.setValue(newCart);
  };

  return { cart, setAllCart };
};

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return { storedValue, setValue };
};
