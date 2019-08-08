import React, { useState } from 'react';
import '../styles/CanvasModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import propTypes from 'prop-types';
import PaintGrid from './PaintGrid';
import { PainterContext, colors } from './context/PainterContext';
import ColorPicker from './ColorPicker';

const CanvasModal = ({ setIsCanvasOpen }) => {
  const [color, setColor] = useState(colors[0]);
  return (
    <div className="canvasModal">
      <div className="canvasModal-closeBtn" onClick={() => setIsCanvasOpen(false)}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>
      <PainterContext.Provider value={{ colors, color, setColor }}>
        <PaintGrid />
        <ColorPicker />
      </PainterContext.Provider>
    </div>
  );
};

CanvasModal.propTypes = {
  setIsCanvasOpen: propTypes.func.isRequired,
};

export default CanvasModal;
