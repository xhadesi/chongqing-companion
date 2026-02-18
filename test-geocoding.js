const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config({ path: '.env.local' });

async function testGeocoding() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ API Key not found in .env.local");
        return;
    }
    console.log("✅ API Key found:", apiKey.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const query = "Raffles City";
    console.log(`🔍 Testing geocoding for: "${query}"...`);

    const prompt = `
    Find the coordinates for this place in Chongqing, China: "${query}".
    Return a JSON object with lat, lng, name.
    ALWAYS RETURN VALID JSON.
  `;

    try {
        const result = await model.generateContent(prompt);
        console.log("✅ Response received!");
        console.log(result.response.text());
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testGeocoding();
