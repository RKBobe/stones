// Grab the key from your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const fetchAIInterpretation = async (stones, userNote) => {
  // If the key is missing, we catch it early
  if (!API_KEY) {
    console.error("API Key is missing! Check your .env file and restart Vite.");
    return "The Seer is currently unavailable. (Missing API Key)";
  }

  const runeDetails = stones.map(s => 
    `${s.name} (${s.isInverted ? 'Inverted' : 'Upright'}): ${s.meaning}`
  ).join(", ");

  const prompt = `
    You are an ancient Nordic Volva (Seer). 
    Interpret this Rune Cast for the question: "${userNote || 'General Guidance'}"
    Runes: ${runeDetails}
    
    Provide a cohesive, poetic interpretation (approx 80-100 words). 
    Focus on the "wyrd" (fate) woven between these specific stones.
    Tone: Atmospheric, wise, and grounded in Norse mythology.
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    // Safety check for the API response structure
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("The Seer's vision is clouded:", error);
    return "The mists of Niflheim obscure the view. Try casting again when the winds change.";
  }
};