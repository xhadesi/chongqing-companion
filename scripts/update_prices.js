const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\lucas\\.gemini\\antigravity\\scratch\\chongqing-companion\\src\\data\\defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf8');

// A mapping of title keywords to estimated prices
const priceMap = [
    { match: /Aéroport/i, price: "12 € (RER B)" },
    { match: /Vol/i, price: null }, // no price for flights
    { match: /Dîner.*Food Street/i, price: "40-80 ¥" },
    { match: /Hongyadong/i, price: "Gratuit" },
    { match: /Xiaomian/i, price: "15-20 ¥" },
    { match: /Costume/i, price: "1500-4000 ¥" },
    { match: /Luohan/i, price: "30 ¥" },
    { match: /Shancheng Xiang/i, price: "Gratuit" },
    { match: /Puxu Restaurant/i, price: "200-300 ¥" },
    { match: /Three Gorges Museum/i, price: "Gratuit" },
    { match: /People's Auditorium/i, price: "10 ¥" },
    { match: /Photoshoot/i, price: "200-300 ¥" },
    { match: /Street Food/i, price: "30-50 ¥" },
    { match: /SPACE Club/i, price: "100-300 ¥" },
    { match: /Cableway/i, price: "30 ¥" },
    { match: /Liziba/i, price: "Gratuit" },
    { match: /Eling/i, price: "Gratuit" },
    { match: /Guanyinqiao/i, price: "100-200 ¥" },
    { match: /Arrail Dental/i, price: "500-800 ¥" },
    { match: /Shopping Mod/i, price: "Variable" },
    { match: /PLAY HOUSE/i, price: "200-500 ¥" },
    { match: /Nanshan/i, price: "50 ¥" },
    { match: /Pipa Yuan/i, price: "150-250 ¥" },
    { match: /Golden Impressions/i, price: "200-350 ¥" },
    { match: /Sparkling Sky Bar/i, price: "150-300 ¥" },
    { match: /Ciqikou/i, price: "Gratuit" },
    { match: /Graffiti/i, price: "Gratuit" },
    { match: /Tanyaochu/i, price: "120-180 ¥" },
    { match: /Zoo/i, price: "25 ¥" },
    { match: /Zhongshuge/i, price: "Gratuit" },
    { match: /Croisière/i, price: "150 ¥" },
    { match: /Revolucion/i, price: "80-150 ¥" },
    { match: /Karst/i, price: "100 ¥ (Trajet)" },
    { match: /Three Natural Bridges/i, price: "135 ¥" },
    { match: /Furong/i, price: "120 ¥" },
    { match: /Retour épuisé/i, price: "100 ¥" },
    { match: /Bus Express vers Dazu/i, price: "80 ¥" },
    { match: /Baodingshan/i, price: "115 ¥" },
    { match: /Dazu/i, price: "50-100 ¥" },
    { match: /Médecine Traditionnelle/i, price: "150-300 ¥" },
    { match: /Wallace/i, price: "40-60 ¥" },
    { match: /Souvenirs/i, price: "Variable" },
    { match: /Ting Yun Pavilion/i, price: "300-500 ¥" },
    { match: /Aéroport.*T3/i, price: "60-100 ¥ (Taxi)" },
    { match: /Arrivée.*Check-in/i, price: "60-100 ¥ (Taxi)" }
];

let updatedContent = content.replace(/({\s*id: [^,}]+,[\s\S]*?completed: false\s*})/g, (match) => {
    // If it already has priceEstimate, return as is
    if (match.includes('priceEstimate:')) return match;

    // Extract title
    const titleMatch = match.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) return match;
    const title = titleMatch[1];

    let price = "Variable"; // default price
    for (const mapping of priceMap) {
        if (mapping.match.test(title)) {
            price = mapping.price;
            break;
        }
    }

    // If price is null, don't add priceEstimate (e.g., flights)
    if (price === null) return match;

    // Add priceEstimate before completed: false
    return match.replace(/([\s\t]*)completed: false/, `$1priceEstimate: "${price}",\n$1completed: false`);
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Prices updated in defaultItinerary.ts");
