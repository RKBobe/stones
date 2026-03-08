import { STONES } from '../constants/runes';

/**
 * castRunes
 * @param {number} count - How many stones to draw (1, 3, 5, or 9)
 * @returns {Array} - An array of stone objects with orientation and position
 */
export const castRunes = (count = 3) => {
  // 1. Shuffle the bag (Fisher-Yates Shuffle)
  const bag = [...STONES];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }

  // 2. Draw the requested number of stones
  const selection = bag.slice(0, count);

  // 3. Process each stone's "landing" state
  return selection.map((stone) => {
    // Check if the stone even has a reversed meaning in our data
    const hasReversedMeaning = stone.merkstave !== null;
    
    // 50% chance of being inverted/reversed
    const isInverted = hasReversedMeaning ? Math.random() < 0.5 : false;

    return {
      ...stone,
      isInverted,
      // Metadata for UI placement (random coordinates and rotation)
      layout: {
        rotation: Math.floor(Math.random() * 360), // Random spin 0-360 deg
        offsetX: Math.floor(Math.random() * 40) - 20, // Slight horizontal drift
        offsetY: Math.floor(Math.random() * 40) - 20, // Slight vertical drift
      }
    };
  });
};
  