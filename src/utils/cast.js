import { STONES } from '../constants/runes';

export const castRunes = (count = 3) => {
  const bag = [...STONES];
  
  // Fisher-Yates Shuffle
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }

  const selection = bag.slice(0, count);

  return selection.map((stone) => {
    const canBeInverted = stone.merkstave !== null && stone.merkstave !== undefined;
    const isInverted = canBeInverted ? Math.random() < 0.4 : false;
    const currentMeaning = isInverted ? stone.merkstave : stone.meaning;

    return {
      ...stone,
      id: crypto.randomUUID(), 
      isInverted,
      meaning: currentMeaning, 
      layout: {
        rotation: Math.floor(Math.random() * 360),
        offsetX: Math.floor(Math.random() * 160) - 80, 
        offsetY: Math.floor(Math.random() * 160) - 80,
      }
    };
  });
};