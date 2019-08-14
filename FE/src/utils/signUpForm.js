import { useState, useCallback } from 'react';

export const useShowupString = string => {
  let timeOut = null;
  const [showupString, setShowupString] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const setShowupStringFunc = useCallback(
    string => {
      setShowupString(string);
      setIsShowing(true);
      timeOut = setTimeout(() => setIsShowing(false), 2000);
      return () => {
        clearTimeout(timeOut);
      };
    },
    [setShowupString, setIsShowing],
  );

  return { setShowupStringFunc, showupString, isShowing, setIsShowing };
};
