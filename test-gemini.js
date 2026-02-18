const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAaekuUy7stqeEYx-XQf6-x1oQfITmaeYY";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // This is not directly exposed in the high-level client in some versions, 
        // but usually we can try to get a model and run verify.
        // Actually, let's just try to call a simple generateContent on multiple candidates.

        const candidates = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.0-pro",
            "gemini-pro",
            "gemini-flash"
        ];

        console.log("Testing models...");

        for (const modelName of candidates) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello?");
                console.log(`✅ ${modelName} WORKED!`);
                console.log(result.response.text());
                return; // Exit on first success
            } catch (e) {
                console.log(`❌ ${modelName} failed: ${e.message.split('\n')[0]}`);
            }
        }

        console.log("All models failed.");

    } catch (error) {
        console.error("Fatal Error:", error);
    }
}

listModels();
