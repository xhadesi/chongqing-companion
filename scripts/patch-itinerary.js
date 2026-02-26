const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove noodle image from Dentist
content = content.replace(
    'title: "Arrail Dental VIP (Détartrage, Caries)",\r\n                images: ["/images/places/bf_7_1.jpg"],',
    'title: "Arrail Dental VIP (Détartrage, Caries)",'
);

// Fallback for LF endings
content = content.replace(
    'title: "Arrail Dental VIP (Détartrage, Caries)",\n                images: ["/images/places/bf_7_1.jpg"],',
    'title: "Arrail Dental VIP (Détartrage, Caries)",'
);

// 2. Add SPACE Club to Saturday evening (Day 4)
const day4Anchor = 'title: "Dîner Street Food (Baozi & Nouilles)",\r\n                images: ["/images/places/bf_3_3.jpg", "/images/places/bf_2_2.jpg"],\r\n                description: "Après le photoshoot, remontez vers le centre de Yuzhong pour dîner sur le pouce dans les ruelles animées. L\'occasion idéale de tester des petits baos brûlants et des brochettes croustillantes.",\r\n                tips: "Ne cherchez pas un grand restaurant ce soir : les meilleurs repas se prennent souvent sur un coin de table en plastique avec une bière locale fraîche (Shancheng Pijiu).",\r\n                location: "Yuzhong",\r\n                address: "Jiefangbei Food Streets",\r\n                icon: "🥟",\r\n                completed: false\r\n            }';

const day4AnchorLF = day4Anchor.replace(/\r\n/g, '\n');

const newClub = `,
            {
                id: generateId(),
                time: "22:30",
                duration: "3h",
                title: "SPACE Club (Jiefangbei)",
                images: ["/images/places/bf_12_1.jpg", "/images/places/bf_13_3.jpg"],
                description: "Puisque nous sommes samedi soir, impossible de rater l'expérience d'un ultra-club chinois ! SPACE est l'une des franchises les plus folles du pays : écrans géants, EDM surpuissant, shows pyrotechniques en salle et tables remplies de jeunes très apprêtés.",
                tips: "Le secret pour rentrer facilement et avoir une bonne place : aborde un groupe stylé à l'entrée avec ton WeChat et un sourire confiant, ou demande à ton hôtel de te réserver une table (Ka Zuo). Reste cool et souris quand on te tendra un verre (Ganbei !).",
                location: "Yuzhong",
                address: "Jiefangbei",
                icon: "🪩",
                completed: false
            }`;

if (content.includes(day4Anchor)) {
    content = content.replace(day4Anchor, day4Anchor + newClub);
    console.log("Added SPACE club to CRLF");
} else if (content.includes(day4AnchorLF)) {
    content = content.replace(day4AnchorLF, day4AnchorLF + newClub);
    console.log("Added SPACE club to LF");
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Itinerary patched.");
