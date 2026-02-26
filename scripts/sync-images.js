const fs = require('fs');
const path = require('path');

const itineraryPath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(itineraryPath, 'utf8');

const replacements = [
    {
        title: "Rendez-vous Tailleur",
        search: /title:\s*"Rendez-vous Tailleur[^\n]*",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Rendez-vous Tailleur (Suitsupply IFS ou Local Jiefangbei)",\n                images: ["/images/places/sight_6_1.jpg", "/images/places/sight_6_2.jpg", "/images/places/sight_6_3.jpg"]`
    },
    {
        title: "Luohan Temple",
        search: /title:\s*"Luohan Temple[^\n]*",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Luohan Temple & Kung Fu Temple",\n                images: ["/images/places/sight_15_1.jpg", "/images/places/sight_15_2.jpg", "/images/places/sight_15_3.jpg"]`
    },
    {
        title: "Three Gorges Museum",
        search: /title:\s*"Three Gorges Museum",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Three Gorges Museum",\n                images: ["/images/places/sight_4_1.jpg", "/images/places/sight_4_2.jpg", "/images/places/sight_4_3.jpg"]`
    },
    {
        title: "Yangtze River Cableway",
        search: /title:\s*"Yangtze River Cableway",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Yangtze River Cableway",\n                images: ["/images/places/sight_7_1.jpg", "/images/places/sight_7_2.jpg", "/images/places/sight_7_3.jpg"]`
    },
    {
        title: "PLAY HOUSE Ultra-Club",
        search: /title:\s*"PLAY HOUSE Ultra-Club[^\n]*",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "PLAY HOUSE Ultra-Club (Nine Street)",\n                images: ["/images/guide/night_playhouse.jpg"]`
    },
    {
        title: "Ciqikou Ancient Town",
        search: /title:\s*"Ciqikou Ancient Town",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Ciqikou Ancient Town",\n                images: ["/images/places/sight_2_1.jpg", "/images/places/sight_2_2.jpg", "/images/places/sight_2_3.jpg"]`
    },
    {
        title: "Chongqing Zoo",
        search: /title:\s*"Chongqing Zoo[^\n]*",\r?\n\s*images:\s*\[[^\]]+\]/g,
        replace: `title: "Chongqing Zoo (Les Pandas !)",\n                images: ["/images/places/sight_8_1.jpg", "/images/places/sight_8_2.jpg", "/images/places/sight_8_3.jpg"]`
    },
    // Eling park lacks trailing comma sometimes? Let's use simpler replace for it.
];

replacements.forEach(r => {
    if (content.match(r.search)) {
        content = content.replace(r.search, r.replace);
        console.log("Patched", r.title);
    } else {
        console.log("NOT FOUND:", r.title);
    }
});

// Eling Park (it has multiple items on the line, like & Testbed 2)
content = content.replace(
    'title: "Eling Park & Testbed 2 (贰厂)",\r\n                images: ["/images/places/sight_9_1.jpg", "/images/places/sight_18_1.jpg", "/images/places/sight_18_2.jpg"],',
    'title: "Eling Park & Testbed 2 (贰厂)",\r\n                images: ["/images/places/sight_9_1.jpg", "/images/places/sight_9_2.jpg", "/images/places/sight_9_3.jpg"],'
);
content = content.replace( // fallback lf
    'title: "Eling Park & Testbed 2 (贰厂)",\n                images: ["/images/places/sight_9_1.jpg", "/images/places/sight_18_1.jpg", "/images/places/sight_18_2.jpg"],',
    'title: "Eling Park & Testbed 2 (贰厂)",\n                images: ["/images/places/sight_9_1.jpg", "/images/places/sight_9_2.jpg", "/images/places/sight_9_3.jpg"],'
);

// We need to double check the SPACE CLUB. Currently we put bf_14 for space club, but let's make sure it matches GuideData or has a good unsplash. Wait, the guide data script said Guide has: ["/images/places/sight_6_1.jpg", "/images/places/sight_6_2.jpg", "/images/places/sight_6_3.jpg"] for SPACE Club? No, it matched something randomly. We should use the night playhouse image or unsplash. bf_14 is actually Revolucion cocktail probably.
// Let's use the unsplash image for SPACE club to be safe.
content = content.replace(
    /images: \["\/images\/places\/bf_14_1\.jpg", "\/images\/places\/bf_14_2\.jpg", "\/images\/places\/bf_14_3\.jpg"\]/g,
    'images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop"]'
);


fs.writeFileSync(itineraryPath, content, 'utf8');

// BUMP storage to v1.9
const hookPath = path.join(__dirname, '../src/hooks/useAgenda.ts');
let hookContent = fs.readFileSync(hookPath, 'utf8');
hookContent = hookContent.replace('const STORAGE_KEY = "chongqing-agenda-v1.8";', 'const STORAGE_KEY = "chongqing-agenda-v1.9";');
fs.writeFileSync(hookPath, hookContent, 'utf8');

console.log("Done syncing images with GuideData and bumping storage to 1.9.");
