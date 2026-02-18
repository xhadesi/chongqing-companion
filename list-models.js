const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API Key found in env");
    process.exit(1);
}
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API Error:", json.error.message);
            } else if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log("No models found or unexpected format:", json);
            }
        } catch (e) {
            console.error("Parse Error:", e);
            console.log("Raw Response:", data);
        }
    });
}).on("error", (err) => {
    console.error("Network Error:", err.message);
});
