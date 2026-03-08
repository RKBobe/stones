import React, { useState } from 'react';
import './App.css';
import { castRunes } from './utils/cast';
import RuneStone from './components/RuneStone';

function App() {
  const [currentCast, setCurrentCast] = useState([]);
  const [selectedStone, setSelectedStone] = useState(null);

  const handleCast = (num) => {
    // Reset selection and generate new stones
    setSelectedStone(null);
    const results = castRunes(num);
    setCurrentCast(results);
  };

  return (
    <div className="app-container">
      <header>
        <h1>ᛒᛟᛟᚱᛞ STONES ᚱᚢᚾᛖᛋ</h1>
        <p>Focus on your question, then cast the stones.</p>
      </header>

      <main className="casting-cloth">
        {currentCast.length > 0 ? (
          <div className="stones-layout">
            {currentCast.map((stone, index) => (
              <RuneStone 
                key={`${stone.id}-${index}`} 
                stone={stone} 
                onSelect={setSelectedStone} 
              />
            ))}
          </div>
        ) : (
          <div className="empty-cloth">
            <p>The cloth is empty...</p>
          </div>
        )}
      </main>

      <section className="controls">
        <button onClick={() => handleCast(1)}>Single Stone</button>
        <button onClick={() => handleCast(3)}>Three Norns (Past/Present/Future)</button>
        <button onClick={() => handleCast(5)}>Celtic Cross</button>
      </section>

      {/* Interpretation Modal */}
      {selectedStone && (
        <div className="modal-overlay" onClick={() => setSelectedStone(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-symbol">{selectedStone.symbol}</span>
            <h2>{selectedStone.name} {selectedStone.isInverted ? '(Merkstave)' : ''}</h2>
            <h3>{selectedStone.meaning}</h3>
            <hr />
            <p className="description">
              {selectedStone.isInverted && selectedStone.merkstave 
                ? selectedStone.merkstave 
                : selectedStone.essence}
            </p>
            <button className="close-btn" onClick={() => setSelectedStone(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;