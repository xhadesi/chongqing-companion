const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\lucas\\.gemini\\antigravity\\scratch\\chongqing-companion\\src\\data\\defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf8');

const realPriceMap = [
    { match: /Aéroport/i, price: "12 € (RER B)" },
    { match: /Vol/i, price: null }, // no price for flights
    { match: /Arrivée.*Check-in/i, price: "80-120 ¥ (DiDi)" },
    { match: /Dîner.*Food Street/i, price: "30-50 ¥" },
    { match: /Hongyadong/i, price: "Gratuit" },
    { match: /Xiaomian/i, price: "15-20 ¥" },
    { match: /Costume/i, price: "4000-8000 ¥" },
    { match: /Luohan/i, price: "20 ¥" },
    { match: /Shancheng Xiang/i, price: "Gratuit" },
    { match: /Puxu Restaurant/i, price: "200-300 ¥" },
    { match: /Three Gorges Museum/i, price: "Gratuit" },
    { match: /People's Auditorium/i, price: "Gratuit (Extérieur)" },
    { match: /Photoshoot/i, price: "200-300 ¥ (Hanfu)" },
    { match: /Street Food/i, price: "30-50 ¥" },
    { match: /SPACE Club/i, price: "Sur conso (Min. requis pr table)" },
    { match: /Cableway/i, price: "30 ¥ (Aller-retour)" },
    { match: /Liziba/i, price: "2-5 ¥ (Métro)" },
    { match: /Eling/i, price: "Gratuit" },
    { match: /Guanyinqiao/i, price: "100-200 ¥" },
    { match: /Arrail Dental/i, price: "300-600 ¥ (Détartrage)" },
    { match: /Shopping Mod/i, price: "Variable" },
    { match: /PLAY HOUSE/i, price: "Sur conso (Min. requis pr table)" },
    { match: /Nanshan/i, price: "50 ¥ (Avec serres)" },
    { match: /Pipa Yuan/i, price: "100-150 ¥" },
    { match: /Golden Impressions/i, price: "200-350 ¥" },
    { match: /Sparkling Sky Bar/i, price: "100-200 ¥ (Cocktail)" },
    { match: /Ciqikou/i, price: "Gratuit" },
    { match: /Graffiti/i, price: "Gratuit" },
    { match: /Tanyaochu/i, price: "120-150 ¥" },
    { match: /Zoo/i, price: "25 ¥" },
    { match: /Zhongshuge/i, price: "Gratuit" },
    { match: /Croisière/i, price: "130-188 ¥" },
    { match: /Revolucion/i, price: "80-120 ¥ (Cocktail)" },
    { match: /Karst/i, price: "60-80 ¥ (Bus/Train)" },
    { match: /Three Natural Bridges/i, price: "155 ¥" },
    { match: /Furong/i, price: "150 ¥" },
    { match: /Retour épuisé/i, price: "60-80 ¥ (Train)" },
    { match: /Bus Express vers Dazu/i, price: "50-80 ¥" },
    { match: /Baodingshan/i, price: "115 ¥" },
    { match: /Dazu.*repas/i, price: "50-80 ¥" },
    { match: /Médecine Traditionnelle/i, price: "150-300 ¥" },
    { match: /Wallace/i, price: "30-50 ¥" },
    { match: /Souvenirs/i, price: "Variable" },
    { match: /Ting Yun Pavilion/i, price: "300-500 ¥" },
    { match: /Aéroport.*T3/i, price: "80-120 ¥ (DiDi)" }
];

let updatedContent = content.replace(/({\s*id: [^,}]+,[\s\S]*?completed: false\s*})/g, (match) => {
    // Extract title
    const titleMatch = match.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) return match;
    const title = titleMatch[1];

    let price = "Variable"; // default price
    for (const mapping of realPriceMap) {
        if (mapping.match.test(title)) {
            price = mapping.price;
            break;
        }
    }

    // If price is null, we should remove the priceEstimate field if it exists
    if (price === null) {
        return match.replace(/[\s\t]*priceEstimate:\s*"[^"]+",\n/, '\n');
    }

    // If it already has priceEstimate, replace its value
    if (match.includes('priceEstimate:')) {
        return match.replace(/priceEstimate:\s*"[^"]+"/, `priceEstimate: "${price}"`);
    } else {
        // Add priceEstimate before completed: false
        return match.replace(/([\s\t]*)completed: false/, `$1priceEstimate: "${price}",\n$1completed: false`);
    }
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Real prices injected into defaultItinerary.ts");
