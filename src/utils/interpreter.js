export const getOverallVibe = (stones) => {
    const total = stones.length;
    const invertedCount = stones.filter(s => s.isInverted).length;
    
    // Logic for a "Collective Meaning"
    if (invertedCount === 0) return "The path ahead is clear and the energies are aligned in your favor.";
    if (invertedCount === total) return "Significant internal blockages or hidden obstacles require your immediate attention.";
    if (invertedCount > total / 2) return "The energies are turbulent; caution and introspection are advised.";
    
    return "A balanced mix of challenge and opportunity. Action is required, but stay grounded.";
  };
  