import { useState, useCallback, useRef } from 'react';

export const useShowupString = string => {
  const [showupString, setShowupString] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const setShowupStringFunc = useCallback(
    string => {
      setShowupString(string);
      setIsShowing(true);

      if (isShowing) {
        setTimeout(() => {
          setIsShowing(false);
        }, 2000);
      }
    },
    [setShowupString, setIsShowing],
  );

  return { setShowupStringFunc, showupString, isShowing, setIsShowing };
};
