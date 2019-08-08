import React, { useContext } from 'react';
import '../styles/ColorPicker.scss';
import { PainterContext } from './context/PainterContext';

const ColorPicker = () => {
  const { colors, setColor } = useContext(PainterContext);

  const ColorOption = ({ color }) => {
    return (
      <div
        key={color.name}
        className="color"
        style={{ backgroundColor: color.hex }}
        onClick={() => setColor(color)}
      />
    );
  };

  const ColorOptions = () => {
    return colors.map((color, index) => {
      return <ColorOption key={index} color={color} />;
    });
  };

  return (
    <div className="colorpicker">
      <ColorOptions />
    </div>
  );
};

export default ColorPicker;
