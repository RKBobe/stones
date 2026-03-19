import { motion } from 'framer-motion';

const PremiumGate = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="paywall-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="paywall-card">
        <h2>Unlock the Great Mysteries</h2>
        <p>The Norns offer deeper wisdom to those who commit to the path.</p>
        <ul>
          <li>✨ Unlimited AI Interpretations</li>
          <li>📜 Infinite Journal Chronicles</li>
          <li>🔮 Ad-free Experience</li>
        </ul>
        <button className="upgrade-button" onClick={onUpgrade}>
          BECOME A SEER - $4.99/mo
        </button>
        <button className="close-link" onClick={onClose}>Maybe later</button>
      </div>
    </motion.div>
  );
};

export default PremiumGate;