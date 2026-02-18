const fs = require('fs');
const path = require('path');

const GUIDE_DATA_PATH = path.join(__dirname, '../src/data/guideData.ts');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Read the file
const content = fs.readFileSync(GUIDE_DATA_PATH, 'utf8');

// Regex to find image paths
const regex = /image:\s*"(.*?)"/g;
let match;
const missing = [];
const found = [];

console.log('Scanning for image paths in guideData.ts...');

while ((match = regex.exec(content)) !== null) {
    const imagePath = match[1];

    // Ignore external links if any (though we expect local)
    if (imagePath.startsWith('http')) continue;

    const fullPath = path.join(PUBLIC_DIR, imagePath);

    if (fs.existsSync(fullPath)) {
        found.push(imagePath);
    } else {
        missing.push(imagePath);
    }
}

console.log(`\nFound ${found.length} valid images.`);
console.log(`Found ${missing.length} MISSING images:\n`);

missing.forEach(img => {
    console.log(`❌ Missing: ${img}`);
    // Try to find a suggestion?
    const basename = path.basename(img);
    // console.log(`   (Basename: ${basename})`);
});

if (missing.length === 0) {
    console.log("✅ All images are valid!");
}
