const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const day4Activity = `,
            {
                id: generateId(),
                time: "20:00",
                duration: "2h",
                title: "Dîner Street Food (Baozi & Nouilles)",
                images: ["/images/places/bf_3_3.jpg", "/images/places/bf_2_2.jpg"],
                description: "Après le photoshoot, remontez vers le centre de Yuzhong pour dîner sur le pouce dans les ruelles animées. L'occasion idéale de tester des petits baos brûlants et des brochettes croustillantes.",
                tips: "Ne cherchez pas un grand restaurant ce soir : les meilleurs repas se prennent souvent sur un coin de table en plastique avec une bière locale fraîche (Shancheng Pijiu).",
                location: "Yuzhong",
                address: "Jiefangbei Food Streets",
                icon: "🥟",
                completed: false
            },
            {
                id: generateId(),
                time: "22:30",
                duration: "3h",
                title: "SPACE Club (Jiefangbei)",
                images: ["/images/places/bf_12_1.jpg", "/images/places/bf_13_3.jpg"],
                description: "Puisque nous sommes samedi soir, impossible de rater l'expérience d'un ultra-club chinois ! SPACE est l'une des franchises les plus folles du pays : écrans géants, EDM surpuissant, shows pyrotechniques en salle et tables remplies de jeunes très apprêtés.",
                tips: "Le secret pour rentrer facilement et avoir une bonne place : aborde un groupe stylé à l'entrée avec ton WeChat et un sourire confiant. Reste cool et souris quand on te tendra un verre (Ganbei !).",
                location: "Yuzhong",
                address: "Jiefangbei",
                icon: "🪩",
                completed: false
            }`;

const day5Activity = `,
            {
                id: generateId(),
                time: "19:00",
                duration: "3h",
                title: "Dîner et Balade à Guanyinqiao",
                images: ["/images/places/sight_21_1.jpg", "/images/places/bf_5_3.jpg"],
                description: "Prenez le métro vers le nord pour découvrir Guanyinqiao, le cœur vibrant et ultramoderne de Jiangbei. Profitez des immenses écrans 3D, de la foule jeune et branchée, et choisissez un grand restaurant dans l'un des somptueux centres commerciaux (Paradise Walk).",
                tips: "C'est l'endroit parfait pour observer la mode locale de pointe (très audacieuse). N'hésitez pas à demander aux habitants dans la rue pour trouver les restaurants populaires nichés dans les hauts étages.",
                location: "Jiangbei",
                address: "Guanyinqiao",
                icon: "🏙️",
                completed: false
            }`;


// We know the exact title line, so let's match the closing bracket of that activity.
// Shibati
const shibatiRegex = /(title: "Photoshoot Traditionnel & Shibati",[\s\S]*?completed: false\r?\n\s*)}/g;
if (shibatiRegex.test(content)) {
    content = content.replace(shibatiRegex, '$1}' + day4Activity);
    console.log("Injected Day 4 (Saturday) activities.");
} else {
    console.log("Failed to find Shibati.");
}

// Eling Park
const elingRegex = /(title: "Eling Park & Testbed 2[^\n]*",[\s\S]*?completed: false\r?\n\s*)}/g;
if (elingRegex.test(content)) {
    content = content.replace(elingRegex, '$1}' + day5Activity);
    console.log("Injected Day 5 (Sunday) activities.");
} else {
    console.log("Failed to find Eling.");
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Done patching defaultItinerary.ts.");
