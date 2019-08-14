import { useState, useCallback, useEffect } from 'react';

export const useShowupString = string => {
  const [showupString, setShowupString] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const setShowupStringFunc = useCallback(
    string => {
      setShowupString(string);
      if (string !== '') {
        setIsShowing(true);
      }
    },
    [setShowupString, setIsShowing],
  );
  useEffect(() => {
    if (isShowing) {
      setTimeout(() => {
        setIsShowing(false);
      }, 2000);
    }
  }, [isShowing]);

  return { setShowupStringFunc, showupString, isShowing, setIsShowing };
};
