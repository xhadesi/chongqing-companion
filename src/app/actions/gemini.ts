"use server";

export type Message = {
  role: "user" | "model";
  content: string;
};

export async function chatWithGemini(history: Message[], apiKey?: string) {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;
  if (!effectiveKey) return { text: "Erreur : Clé API manquante. Configurez-la dans les réglages.", data: null };

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(effectiveKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // System instruction to guide behavior and JSON output
  const systemPrompt = `
    You are a friendly local guide for Chongqing.
    You help the user find places to visit, eat, shop, etc.
    
    BEHAVIOR:
    - If the user asks for recommendations (places, restaurants, spots), YOU MUST RETURN A JSON OBJECT containing the "text" AND a "recommendations" array.
    - If the user just wants to chat or asks for info without specific places, return just a JSON with "text".
    
    JSON FORMAT for recommendations:
    {
      "text": "Brief conversational response (e.g. 'Voici 3 super endroits !')",
      "recommendations": [
        {
          "id": "unique_id",
          "name": "French Name",
          "chineseName": "Chinese Name",
          "district": "District",
          "description": "Short description",
          "type": "sight" | "food" | "shopping" | "local" | "transport" | "nightlife",
          "rating": 4.5,
          "lat": 29.5,
          "lng": 106.5
        }
      ]
    }

    JSON FORMAT for text only:
    {
      "text": "Your conversational response here."
    }

    ALWAYS RETURN VALID JSON. NO MARKDOWN.
    Response must be a raw JSON object, not inside a code block.
    `;

  try {
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I will always respond in JSON." }] },
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }))
      ]
    });

    const lastMsg = history[history.length - 1];
    const result = await chat.sendMessage(lastMsg.content);

    const responseText = result.response.text();

    // Improved JSON extraction: find the first '{' and last '}'
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Gemini Raw Response (Failed to parse JSON):", responseText);
      const fs = await import("fs/promises");
      await fs.appendFile("debug_gemini.log", `[${new Date().toISOString()}] JSON Parse Error. Raw: ${responseText}\n`);
      throw new Error("No JSON found in response");
    }

    const cleanJson = jsonMatch[0];
    return JSON.parse(cleanJson);

  } catch (error: any) {
    console.error("Gemini Chat Error Details:", error);
    // Log to file for persistence if needed, but console is visible in server logs
    // const fs = await import("fs/promises");
    // await fs.appendFile("debug_gemini.log", `[${new Date().toISOString()}] Error: ${error}\n`);

    // Return the actual error to the user for debugging purposes
    return {
      text: `Erreur (Debug): ${error.message || String(error)}. Vérifiez la clé API ou les logs serveur.`,
      data: null
    };
  }
}

export async function getGeminiAlertStatus() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    Check for any recent official travel alerts, health warnings, or emergencies for Chongqing, China.
    
    Return a JSON object with:
    - hasAlert: boolean (true if there is a MAJOR warning like lockdown, high pollution alert, or extreme weather. False if it's just general advice)
    - message: string (in French. If safe: "Aucune alerte majeure. Profitez de votre voyage !". If alert: "Alerte : [Description courte]")

    Assume the current status is Safe unless known otherwise.
    
    ALWAYS RETURN VALID JSON. NO MARKDOWN.
    Response must be a raw JSON object, not inside a code block.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini Alert Error:", error);
    return null;
  }
}

// Replaced by standard Nominatim search as requested
export async function getGeminiCoordinates(query: string) {
  try {
    const encodedQuery = encodeURIComponent(query + " Chongqing China"); // biases to Chongqing
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1&addressdetails=1`, {
      headers: {
        'User-Agent': 'ChongqingCompanion/1.0'
      }
    });

    const data = await response.json();

    if (!data || data.length === 0) return null;

    const place = data[0];

    return {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      name: query, // Use the user's query as name or place.display_name for full
      chineseName: place.display_name.split(',')[0], // Approximation
      description: place.display_name,
      type: place.type || "sight"
    };
  } catch (e) {
    console.error("Nominatim error", e);
    return null;
  }
}
