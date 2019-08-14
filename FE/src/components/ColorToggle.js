import React, { useState } from 'react';
import '../styles/ColorToggle.scss';

const ColorToggle = () => {
  const [isClick, setIsClick] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  return (
    <div
      className={`toggleContainer ${isClick ? 'toggleContainer-bright' : 'toggleContainer-dark'}`}
      onClick={() => {
        setIsClick(prev => !prev);
        setFirstTime(false);
      }}
    >
      <div
        className={
          firstTime ? 'toggleButton-first' : isClick ? 'toggleButton-bright' : 'toggleButton-dark'
        }
      />
    </div>
  );
};

export default ColorToggle;
