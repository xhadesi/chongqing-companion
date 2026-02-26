const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const imageMappings = {
    "Arrivée & Check-in": `["/images/places/sight_6_1.jpg"]`,
    "Dîner libre à Bayi Haochi Jie": `["/images/places/bf_3_2.jpg", "/images/places/bf_2_1.jpg"]`,
    "Balade nocturne Hongyadong": `["/images/places/sight_1_1.jpg", "/images/places/sight_1_2.jpg"]`,
    "Xiaomian Traditionnel": `["/images/places/bf_1_1.jpg", "/images/places/bf_1_3.jpg"]`,
    "Rendez-vous Tailleur": `["/images/places/sight_21_1.jpg"]`,
    "Luohan Temple": `["/images/places/sight_15_1.jpg", "/images/places/sight_15_2.jpg"]`,
    "Shancheng Xiang": `["/images/places/sight_24_1.jpg", "/images/places/sight_9_2.jpg"]`,
    "Dîner au Puxu Restaurant": `["/images/places/bf_6_1.jpg", "/images/places/bf_6_2.jpg"]`,
    "Three Gorges Museum": `["/images/places/sight_4_1.jpg", "/images/places/sight_4_3.jpg"]`,
    "People's Auditorium": `["/images/places/sight_4_2.jpg"]`,
    "Photoshoot Traditionnel": `["/images/places/sight_24_1.jpg", "/images/places/sight_24_2.jpg"]`,
    "Yangtze River Cableway": `["/images/places/sight_7_1.jpg", "/images/places/sight_7_2.jpg"]`,
    "Liziba Monorail": `["/images/places/sight_3_1.jpg", "/images/places/sight_3_2.jpg"]`,
    "Eling Park & Testbed 2": `["/images/places/sight_9_1.jpg", "/images/places/sight_18_1.jpg", "/images/places/sight_18_2.jpg"]`,
    "Arrail Dental": `["/images/places/bf_7_1.jpg"]`,
    "Shopping Mode": `["/images/places/sight_21_2.jpg", "/images/places/sight_21_3.jpg"]`,
    "PLAY HOUSE": `["/images/places/bf_12_1.jpg", "/images/places/bf_12_2.jpg", "/images/places/bf_13_3.jpg"]`,
    "Nanshan Botanical Garden": `["/images/places/sight_10_1.jpg", "/images/places/sight_10_2.jpg"]`,
    "Hotpot Prémium": `["/images/places/bf_4_1.jpg", "/images/places/bf_4_2.jpg"]`,
    "Golden Impressions": `["/images/places/bf_7_2.jpg"]`,
    "Sparkling Sky Bar": `["/images/places/bf_13_1.jpg", "/images/places/bf_13_2.jpg"]`,
    "Ciqikou": `["/images/places/sight_2_1.jpg", "/images/places/sight_2_2.jpg"]`,
    "Graffiti Art Street": `["/images/places/sight_22_1.jpg", "/images/places/sight_22_2.jpg"]`,
    "Dîner Tanyaochu": `["/images/places/bf_5_1.jpg", "/images/places/bf_5_2.jpg"]`,
    "Chongqing Zoo": `["/images/places/sight_8_1.jpg", "/images/places/sight_8_2.jpg"]`,
    "Librairie Zhongshuge": `["/images/places/sight_23_1.jpg", "/images/places/sight_23_2.jpg"]`,
    "Croisière Nocturne": `["/images/places/sight_13_1.jpg", "/images/places/sight_13_2.jpg"]`,
    "Revolucion Cocktail": `["/images/places/bf_14_1.jpg", "/images/places/bf_14_2.jpg"]`,
    "Trajet vers le Karst": `["/images/places/sight_1_3.jpg"]`,
    "Three Natural Bridges": `["/images/places/sight_5_1.jpg", "/images/places/sight_5_2.jpg"]`,
    "Stalactites Subterrannéenne": `["/images/places/sight_12_1.jpg"]`,
    "WFC Observation Deck": `["/images/places/sight_16_1.jpg", "/images/places/sight_16_2.webp"]`,
    "Dîner et Dernier Verre": `["/images/places/bf_8_1.jpg", "/images/places/bf_10_1.jpg"]`,
    "Vol Retour": `["/images/places/sight_11_1.jpg"]`
};

// First pass: remove any existing images properties to reset
content = content.replace(/\n\s*images:\s*\[.*\],?/g, "");

// Second pass: inject images based on titles
for (const [key, imageArrStr] of Object.entries(imageMappings)) {
    // Regex matches title: ".*key.*",
    const regex = new RegExp(`(title:\\s*"[^"]*${key}[^"]*",)`, "g");
    content = content.replace(regex, `$1\n                images: ${imageArrStr},`);
}

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
                address: "Guanyinqiao Pedestrian Street",
                icon: "🏙️",
                completed: false
            }`;

// Inject missing Day 4 activity after Photoshoot Traditionnel
content = content.replace(/(title: "Photoshoot Traditionnel & Shibati",[\s\S]*?completed: false\n\s*)}/, "$1}" + day4Activity);

// Inject missing Day 5 activity after Eling Park & Testbed 2
content = content.replace(/(title: "Eling Park & Testbed 2 \(贰厂\)",[\s\S]*?completed: false\n\s*)}/, "$1}" + day5Activity);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated defaultItinerary with images and missing activities.");
