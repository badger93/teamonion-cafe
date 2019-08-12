import React, { useState, useContext } from 'react';
import '../styles/PaintGrid.scss';
import { PainterContext } from './context/PainterContext';

const PaintGrid = () => {
  const { colors, color } = useContext(PainterContext);
  // const color = { name: 'green', hex: '#00ff00' };
  const rows = 10;
  const cols = 10;

  const initGrid = [];
  for (let i = 0; i < rows; i++) {
    initGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      initGrid[i][j] = colors[0];
    }
  }

  const [grid, setGrid] = useState(initGrid);

  const updateGrid = (i, j) => {
    if (grid[i][j].hex === color.hex) {
      return;
    }
    grid[i][j] = color;
    setGrid([...grid]);
  };

  const updateGridWithMouse = (e, i, j) => {
    if (e.buttons === 1) {
      updateGrid(i, j);
    }
  };

  const ResetBtn = () => {
    return (
      <div className="column">
        <button onClick={() => setGrid(initGrid)}>Reset</button>
      </div>
    );
  };
  const DrawTableCell = ({ r_i, c_i }) => {
    return (
      <td
        key={c_i}
        className="painterBlock"
        onClick={() => updateGrid(r_i, c_i)}
        onMouseMove={e => updateGridWithMouse(e, r_i, c_i)}
        style={{
          backgroundColor: grid[r_i][c_i].hex,
        }}
      />
    );
  };

  const DrawTableRows = ({ row, r_i }) => {
    return (
      <tr key={r_i}>
        {row.map((col, c_i) => {
          return <DrawTableCell key={c_i} r_i={r_i} c_i={c_i} />;
        })}
      </tr>
    );
  };

  const DrawGrid = () => {
    return (
      <div className="column">
        <table>
          <tbody>
            {grid.map((row, r_i) => {
              return <DrawTableRows key={r_i} row={row} r_i={r_i} />;
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <DrawGrid />
      <ResetBtn />
    </>
  );
};

export default PaintGrid;
