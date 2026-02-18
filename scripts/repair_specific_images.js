const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/images/guide');

// Custom mappings for failed items
const REPAIR_MAPPING = {
    'shop-3': { filename: 'shop_raffles_mall.jpg', search: 'Raffles City Chongqing interior' },
    'shop-11': { filename: 'shop_testbed.jpg', search: 'Chongqing Testbed 2' },
    'shop-22': { filename: 'shop_eling_shops.jpg', search: 'Eling Park Chongqing' },
    'night-11': { filename: 'night_nanshan_bar.jpg', search: 'Chongqing Nanshan night' } // Just to be safe
};

async function fetchImage(term, filename) {
    console.log(`Fixing ${filename} with search: "${term}"...`);
    try {
        // 1. Search Wikipedia
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=5&gsrsearch=${encodeURIComponent(term)}&prop=imageinfo&iiprop=url|size|mime`;

        // Use curl for search
        const searchCmd = `curl -s -L -A "ChongqingCompanionBot/1.0 (lucas@example.com)" "${searchUrl}"`;
        const searchResult = execSync(searchCmd).toString();
        const data = JSON.parse(searchResult);

        if (!data.query || !data.query.pages) {
            console.log(`  No results for ${term}`);
            return false;
        }

        const pages = Object.values(data.query.pages);
        // Filter for JPG/PNG and reasonable size
        const validImages = pages.filter(p => {
            const info = p.imageinfo?.[0];
            return info && (info.mime === 'image/jpeg' || info.mime === 'image/png') && info.size > 50000;
        });

        if (validImages.length === 0) {
            console.log(`  No valid images found for ${term}`);
            return false;
        }

        const bestImage = validImages[0];
        const imageUrl = bestImage.imageinfo[0].url;
        console.log(`  Found URL: ${imageUrl}`);

        // 2. Download
        const filePath = path.join(OUTPUT_DIR, filename);
        // -L follows redirects, -o output file
        execSync(`curl -s -L -A "ChongqingCompanionBot/1.0" "${imageUrl}" -o "${filePath}"`);

        // Validate
        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
            console.log(`  SUCCESS: ${filename}`);
            return true;
        } else {
            console.log(`  FAILED download: ${filename}`);
            return false;
        }

    } catch (e) {
        console.error(`  Error processing ${filename}: ${e.message}`);
        return false;
    }
}

async function run() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const [id, config] of Object.entries(REPAIR_MAPPING)) {
        // Force delete existing if any (especially for that PDF)
        const filePath = path.join(OUTPUT_DIR, config.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`  Deleted existing ${config.filename}`);
        }

        await fetchImage(config.search, config.filename);
    }
}

run();
