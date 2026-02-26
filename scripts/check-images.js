const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '../src/data/guideData.ts');
const itineraryPath = path.join(__dirname, '../src/data/defaultItinerary.ts');

const guideContent = fs.readFileSync(guidePath, 'utf8');
const itineraryContent = fs.readFileSync(itineraryPath, 'utf8');

// VERY rough parsing to extract titles and images from both files for a quick sanity check
const extractItems = (content, regex) => {
    let match;
    const items = [];
    while ((match = regex.exec(content)) !== null) {
        items.push({
            title: match[1],
            images: match[2] ? match[2].trim() : "None"
        });
    }
    return items;
};

// Guide Place Regex (title: "...", images: [...])
const guideRegex = /title:\s*"([^"]+)",[\s\S]*?images:\s*(\[[^\]]+\])/g;
const guideItems = extractItems(guideContent, guideRegex);

// Itinerary Form Regex
const itineraryRegex = /title:\s*"([^"]+)",(?:[\s\S]*?images:\s*(\[[^\]]+\]))?/g;
const itineraryItems = extractItems(itineraryContent, itineraryRegex);

console.log(`Extracted ${guideItems.length} guide items and ${itineraryItems.length} agenda items.\n`);

const issues = [];

itineraryItems.forEach(agendaItem => {
    if (agendaItem.images === "None") return;

    // Try to find a fuzzy match in guideData
    const matchedGuide = guideItems.find(g =>
        agendaItem.title.toLowerCase().includes(g.title.toLowerCase()) ||
        g.title.toLowerCase().includes(agendaItem.title.toLowerCase())
    );

    if (matchedGuide) {
        // Compare image arrays as strings (ignoring whitespace)
        const aImgs = agendaItem.images.replace(/\s/g, '');
        const gImgs = matchedGuide.images.replace(/\s/g, '');
        if (aImgs !== gImgs) {
            issues.push(`MISMATCH: "${agendaItem.title}"\n  Agenda has: ${agendaItem.images}\n  Guide has:  ${matchedGuide.images}`);
        }
    }
});

if (issues.length === 0) {
    console.log("No glaring mismatches found between Agenda and Guide images!");
} else {
    console.log("FOUND IMAGE MISMATCHES:");
    console.log(issues.join("\n\n"));
}
