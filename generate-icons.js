const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const icons = [
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' }
];

async function generateIcons() {
    for (const icon of icons) {
        const svgBuffer = Buffer.from(`
      <svg width="${icon.size}" height="${icon.size}" viewBox="0 0 ${icon.size} ${icon.size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${icon.size}" height="${icon.size}" fill="#ef4444"/>
        <text x="50%" y="50%" font-family="Arial" font-size="${icon.size * 0.4}" fill="white" text-anchor="middle" dy=".3em">CQ</text>
      </svg>
    `);

        await sharp(svgBuffer)
            .png()
            .toFile(path.join(__dirname, 'public', icon.name));

        console.log(`Generated ${icon.name}`);
    }
}

generateIcons().catch(console.error);
