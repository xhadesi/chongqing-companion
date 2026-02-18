const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = 'c:/Users/lucas/.gemini/antigravity/brain/b0779cda-ae84-4dc7-b81a-da938a01b524/media__1771452179200.jpg';
const OUTPUT_DIR_PUBLIC = 'c:/Users/lucas/.gemini/antigravity/scratch/chongqing-companion/public';
const OUTPUT_DIR_APP = 'c:/Users/lucas/.gemini/antigravity/scratch/chongqing-companion/src/app';

async function generateIcons() {
    try {
        if (!fs.existsSync(SOURCE_IMAGE)) {
            console.error('Source image not found:', SOURCE_IMAGE);
            return;
        }

        console.log('Generating icons from:', SOURCE_IMAGE);

        // icon-192x192.png
        await sharp(SOURCE_IMAGE)
            .resize(192, 192)
            .toFile(path.join(OUTPUT_DIR_PUBLIC, 'icon-192x192.png'));
        console.log('Generated icon-192x192.png');

        // icon-512x512.png
        await sharp(SOURCE_IMAGE)
            .resize(512, 512)
            .toFile(path.join(OUTPUT_DIR_PUBLIC, 'icon-512x512.png'));
        console.log('Generated icon-512x512.png');

        // apple-icon.png (usually 180x180 or 192x192, let's use 192 for simplicity or 180 standard)
        await sharp(SOURCE_IMAGE)
            .resize(180, 180)
            .toFile(path.join(OUTPUT_DIR_APP, 'apple-icon.png'));
        console.log('Generated apple-icon.png');

    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons();
