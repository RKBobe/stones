import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RuneStone from './components/RuneStone';
import PremiumGate from './components/PremiumGate';
import { castRunes } from './utils/cast';
import { getOverallVibe } from './utils/interpreter';
import './App.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${API_KEY}`;
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/9B614n8uy82kemv2WZ3VC01"; 

const App = () => {
  const [currentCast, setCurrentCast] = useState([]);
  // Tracks if the user has upgraded
  const [isPro, setIsPro] = useState(() => localStorage.getItem('is_seer_pro') === 'true');
  // Controls the visibility of the Paywall
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedStone, setSelectedStone] = useState(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [aiCounsel, setAiCounsel] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rune_journal') || '[]');
    setHistory(saved);
  }, []);

  const playTossSound = (count) => {
    const fileName = count === 1 ? '1rock.wav' : count === 5 ? '5rock.wav' : '2rock2.wav';
    const audio = new Audio(`/sounds/${fileName}`);
    audio.volume = 0.7;
    audio.play().catch(e => console.warn("Audio blocked: Click page first."));
  };

  const handleCast = (num) => {
    setAiCounsel(""); // Reset AI
    playTossSound(num); // Play Sound
    const results = castRunes(num);
    setCurrentCast(results);
  };

  const seekAiCounsel = async () => {
    // --- THE GATE ---
    if (!isPro) {
      setShowPaywall(true);
      return;
    }

    if (currentCast.length === 0) return;
    setIsAiLoading(true);
    
    const context = prompt("What is your question?") || "General guidance";
    const runeString = currentCast.map((s, i) => `${s.name} (${s.isInverted ? 'Rev' : 'Up'}): ${s.meaning}`).join(", ");
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Interpret: ${runeString}. Question: ${context}. 3 sentences.` }]}]
        })
      });
      const data = await response.json();
      setAiCounsel(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setAiCounsel("The Seer is silent...");
    } finally {
      setIsAiLoading(false);
    }
  };

  const saveToJournal = () => {
    // --- THE GATE ---
    // Allow 3 free saves, then require Pro
    if (!isPro && history.length >= 3) {
      setShowPaywall(true);
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      stones: [...currentCast],
      aiInterpretation: aiCounsel,
      vibe: getOverallVibe(currentCast)
    };
    const updated = [newEntry, ...history];
    setHistory(updated);
    localStorage.setItem('rune_journal', JSON.stringify(updated));
    alert("Saved.");
  };

  const handleUpgrade = () => {
    // For production/Stripe: window.location.href = STRIPE_CHECKOUT_URL;
    // For now, let's simulate a success for testing:
    localStorage.setItem('is_seer_pro', 'true');
    setIsPro(true);
    setShowPaywall(false);
    alert("Welcome, Seer. The mysteries are now yours.");
  };

  return (
    <div className="app-container">
      <header className="shrine-header">
        <h1 className="logo">ᛒᛟᛟᚱᛞ STONES</h1>
        <div className="header-actions">
          {!isPro && <button className="upgrade-mini-btn" onClick={() => setShowPaywall(true)}>UPGRADE 🔒</button>}
          <button className="journal-toggle" onClick={() => setIsJournalOpen(true)}>📜 JOURNAL</button>
        </div>
      </header>

      <main className="cloth-container">
        <div className="casting-cloth">
           <AnimatePresence>
            {currentCast.map((stone, index) => (
              <RuneStone key={stone.id} stone={stone} index={index} onSelect={setSelectedStone} />
            ))}
          </AnimatePresence>
          {currentCast.length === 0 && <p className="whisper">The cloth is empty...</p>}
        </div>

        {/* This ONLY shows if stones are present */}
        {currentCast.length > 0 && !isAiLoading && (
          <motion.div 
            className="interpretation-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="vibe-text">{getOverallVibe(currentCast)}</div>
            {aiCounsel && <div className="ai-prophecy">{aiCounsel}</div>}
            
            <div className="button-group">
              {!aiCounsel && <button onClick={seekAiCounsel}>SEEK COUNSEL</button>}
              <button onClick={saveToJournal}>SAVE READING</button>
              <button onClick={() => setCurrentCast([])}>CLEAR</button>
            </div>
          </motion.div>
        )}
        
        {isAiLoading && <div className="loading-spinner">The Norns are weaving...</div>}
      </main>

      <footer className="controls">
        <button onClick={() => handleCast(1)}>1 STONE</button>
        <button onClick={() => handleCast(3)}>3 NORNS</button>
        <button onClick={() => handleCast(5)}>5 ELEMENTS</button>
      </footer>

      <PremiumGate 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
        onUpgrade={handleUpgrade} 
      />

      {/* --- JOURNAL OVERLAY --- */}
      <AnimatePresence>
        {isJournalOpen && (
          <motion.div 
            className="journal-fullview" 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            style={{ zIndex: 2000 }}
          >
            <div className="journal-inner">
              <div className="journal-header-row">
                <h2>CHRONICLES</h2>
                <button onClick={() => setIsJournalOpen(false)}>CLOSE</button>
              </div>
              
              {!isPro && (
                <div className="pro-banner" onClick={() => setShowPaywall(true)}>
                  UPGRADE TO SEER FOR INFINITE HISTORY 🔒
                </div>
              )}

              <div className="journal-entries">
                {history.length === 0 && <p className="whisper" style={{ textAlign: 'center', marginTop: '40px' }}>Your chronicles are empty...</p>}
                {history.map(entry => (
                  <div key={entry.id} className="journal-card">
                    <div className="card-header">{entry.date} — {entry.vibe}</div>
                    <div className="card-stones">
                      {entry.stones && entry.stones.map((s, i) => (
                        <div key={i} className="stone-entry">
                          <span className={`symbol ${s.isInverted ? 'rev' : ''}`}>{s.symbol}</span>
                          <div className="details">
                            <strong>{s.name}</strong>
                            <p>{s.meaning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {entry.aiInterpretation && <div className="card-ai">"{entry.aiInterpretation}"</div>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;