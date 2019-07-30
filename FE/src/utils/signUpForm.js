import { useState } from 'react';

export const useShowupString = string => {
  const [showupString, setShowupString] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const setShowupStringFunc = string => {
    setShowupString(string);
    setIsShowing(true);
    setTimeout(() => setIsShowing(false), 2000);
  };

  return { setShowupStringFunc, showupString, isShowing, setIsShowing };
};
