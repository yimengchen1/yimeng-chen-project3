import React from 'react';
import { FaCircle, FaTimes, FaCheck } from 'react-icons/fa';

export default function Tile({ cell, row, col, onTileClick, isEnemy }) {
  const handleClick = () => onTileClick(row, col);

  let bg = 'rgba(68,68,68,0.3)';
  let content = null;

  if (cell.hit) {
    bg = 'rgba(255,0,0,0.1)';
    content = <FaTimes style={{ color: 'red' }} />;
  } else if (cell.miss) {
    bg = 'rgba(0,255,0,0.1)';
    content = <FaCheck style={{ color: 'green' }} />;
  } else if (!isEnemy && cell.ship) {
    content = <FaCircle style={{ color: 'black' }} />;
  }

  return (
      <td
          onClick={isEnemy && !cell.hit && !cell.miss ? handleClick : undefined}
          style={{
            width: '35px', height: '35px',
            border: '1px solid rgba(0,191,255,0.2)',
            textAlign: 'center', verticalAlign: 'middle',
            transition: 'all 0.2s ease',
            backgroundColor: bg,
            cursor: isEnemy && !cell.hit && !cell.miss ? 'pointer' : 'default'
          }}
          className={`tile ${cell.hit ? 'hit' : ''} ${cell.miss ? 'miss' : ''}`}
      >
        {content}
      </td>
  );
}
