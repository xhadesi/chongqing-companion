const fs = require('fs');
const path = require('path');

const itineraryPath = path.join(__dirname, '../src/data/defaultItinerary.ts');
const itineraryContent = fs.readFileSync(itineraryPath, 'utf8');

const regex = /title:\s*"([^"]+)",(?:[\s\S]*?images:\s*(\[[^\]]+\]))?/g;
let match;
while ((match = regex.exec(itineraryContent)) !== null) {
    if (match[2] && match[2].includes('bf_')) {
        console.log(`TITLE: ${match[1]}\nIMAGES: ${match[2]}\n`);
    }
}
