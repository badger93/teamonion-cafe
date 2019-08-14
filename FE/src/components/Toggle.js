import React, { useState, useCallback } from 'react';
import '../styles/Toggle.scss';

const Toggle = ({ isRankFirst, setIsRankFirst }) => {
  const [isClick, setIsClick] = useState(isRankFirst);
  const [firstTime, setFirstTime] = useState(true);
  const click = useCallback(() => {
    setIsRankFirst(prev => {
      localStorage.setItem('ISRANKFIRST', !prev);
      return !prev;
    });
    setIsClick(prev => !prev);
    setFirstTime(false);
  }, [setIsClick, setFirstTime, setIsRankFirst]);

  return (
    <div
      className={`toggleContainer ${isClick ? 'toggleContainer-left' : 'toggleContainer-right'}`}
      onClick={click}
    >
      <div
        className={
          firstTime
            ? isRankFirst
              ? 'toggleButton-first-left'
              : 'toggleButton-first-right'
            : isClick
            ? 'toggleButton-left'
            : 'toggleButton-right'
        }
      />
    </div>
  );
};

export default Toggle;
