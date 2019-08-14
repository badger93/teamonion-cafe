import { useState, useCallback, useRef } from 'react';

export const useShowupString = string => {
  let timeOut = null;
  const timeOutRef = useRef();
  const [showupString, setShowupString] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const setShowupStringFunc = useCallback(
    string => {
      setShowupString(string);
      setIsShowing(true);

      if (isShowing) {
        timeOutRef.current = setTimeout(() => {
          setIsShowing(false);
        }, 2000);
      }
    },
    [setShowupString, setIsShowing, timeOutRef],
  );

  return { setShowupStringFunc, showupString, isShowing, setIsShowing };
};
