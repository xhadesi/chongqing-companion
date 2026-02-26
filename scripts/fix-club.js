const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace noodle images for the SPACE Club with actual nightclub stock photo from Unsplash
content = content.replace(
    'images: ["/images/places/bf_12_1.jpg", "/images/places/bf_13_3.jpg"],',
    'images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop"],'
);

// We must bump STORAGE_KEY again to v1.8 to force the local client update
const hookPath = path.join(__dirname, '../src/hooks/useAgenda.ts');
let hookContent = fs.readFileSync(hookPath, 'utf-8');
hookContent = hookContent.replace('const STORAGE_KEY = "chongqing-agenda-v1.7";', 'const STORAGE_KEY = "chongqing-agenda-v1.8";');
fs.writeFileSync(hookPath, hookContent, 'utf-8');

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Club image fixed and storage key bumped to 1.8.");
