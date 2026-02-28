const fs = require('fs');
const path = require('path');

const itineraryPath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(itineraryPath, 'utf8');

// Reflexology
content = content.replace(
    /title:\s*"Golden Impressions Reflexology",\r?\n\s*images:\s*\["\/images\/places\/bf_7_2\.jpg"\],/g,
    `title: "Golden Impressions Reflexology",\n                images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"],`
);

// Sky Bar
content = content.replace(
    /title:\s*"Sparkling Sky Bar \(Affichage Vagues LED\)",\r?\n\s*images:\s*\["\/images\/places\/bf_13_1\.jpg", "\/images\/places\/bf_13_2\.jpg"\],/g,
    `title: "Sparkling Sky Bar (Affichage Vagues LED)",\n                images: ["/images/guide/night_wfc_bar.jpg", "/images/guide/night_horizon.jpg"],`
);

// Revolucion Cocktail
content = content.replace(
    /title:\s*"Revolucion Cocktail \(Bars Centro\)",\r?\n\s*images:\s*\["\/images\/places\/bf_14_1\.jpg", "\/images\/places\/bf_14_2\.jpg"\],/g,
    `title: "Revolucion Cocktail (Bars Centro)",\n                images: ["/images/guide/night_revolution.jpg", "/images/guide/night_lounge.jpg"],`
);

// Fallbacks if formatting is slightly different
content = content.replace(/\["\/images\/places\/bf_13_1\.jpg", "\/images\/places\/bf_13_2\.jpg"\]/g, '["/images/guide/night_wfc_bar.jpg", "/images/guide/night_horizon.jpg"]');
content = content.replace(/\["\/images\/places\/bf_14_1\.jpg", "\/images\/places\/bf_14_2\.jpg"\]/g, '["/images/guide/night_revolution.jpg", "/images/guide/night_lounge.jpg"]');
content = content.replace(/\["\/images\/places\/bf_7_2\.jpg"\]/g, '["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"]');

fs.writeFileSync(itineraryPath, content, 'utf8');

const hookPath = path.join(__dirname, '../src/hooks/useAgenda.ts');
let hookContent = fs.readFileSync(hookPath, 'utf8');
hookContent = hookContent.replace('const STORAGE_KEY = "chongqing-agenda-v1.9";', 'const STORAGE_KEY = "chongqing-agenda-v2.0";');
fs.writeFileSync(hookPath, hookContent, 'utf8');

console.log("Patched Nightlife and bumped Agenda to v2.0");
