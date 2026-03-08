import React from 'react';
import './RuneStone.css'; // We'll define the styles below

const RuneStone = ({ stone, onSelect }) => {
  const { symbol, name, isInverted, layout } = stone;

  // Inline styles for the randomized "scatter" effect
  const stoneStyle = {
    transform: `rotate(${layout.rotation}deg) translate(${layout.offsetX}px, ${layout.offsetY}px)`,
  };

  return (
    <div 
      className="stone-container" 
      style={stoneStyle} 
      onClick={() => onSelect(stone)}
    >
      <div className="stone-shape">
        <span className={`rune-symbol ${isInverted ? 'inverted' : ''}`}>
          {symbol}
        </span>
      </div>
      <p className="stone-label">{name}</p>
    </div>
  );
};

export default RuneStone;