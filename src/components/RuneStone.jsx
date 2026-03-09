import React from 'react';
import { motion } from 'framer-motion';
import './RuneStone.css';

const RuneStone = ({ stone, onSelect, index }) => {
  const { symbol, name, isInverted, layout } = stone;

  return (
    <motion.div 
      className="stone-container"
      initial={{ scale: 0, opacity: 0, y: -200 }} // Drop from top
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: layout.offsetY, 
        x: layout.offsetX,
        rotate: layout.rotation 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.2 // Stones drop one after another
      }}
      onClick={() => onSelect(stone)}
    >
      <div className="stone-shape">
        <span className={`rune-symbol ${isInverted ? 'inverted' : ''}`}>
          {symbol}
        </span>
      </div>
      <p className="stone-label">{name}</p>
    </motion.div>
  );
};
export default RuneStone;