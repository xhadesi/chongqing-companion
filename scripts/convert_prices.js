const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\lucas\\.gemini\\antigravity\\scratch\\chongqing-companion\\src\\data\\defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf8');

const rate = 0.126;

// Helper to convert RMB string to Euro string
function convertPriceString(str) {
    if (!str.includes('¥')) return str; // Don't convert things like "Gratuit", "Variable", or "12 €"

    // Extract numbers
    const numbers = str.match(/\d+/g);
    if (!numbers) return str;

    let newStr = str;
    for (const numStr of numbers) {
        const num = parseInt(numStr, 10);
        // Sometimes prices are small like 2-5
        if (num >= 0) {
            const euro = Math.round(num * rate);
            newStr = newStr.replace(numStr, euro.toString());
        }
    }

    // Replace ¥ with €
    newStr = newStr.replace(/¥/g, '€');
    return newStr;
}

let updatedContent = content.replace(/priceEstimate:\s*"([^"]+)"/g, (match, p1) => {
    return `priceEstimate: "${convertPriceString(p1)}"`;
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Prices converted to Euros in defaultItinerary.ts");
