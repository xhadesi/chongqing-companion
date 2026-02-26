const { GOOGLE_IMG_SCRAP, GOOGLE_IMG_INCOGNITO } = require('google-img-scrap');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Simple regex to extract titles from the mocked data file since we cannot directly import TS files easily in node
const filePath = path.join(__dirname, '..', 'src', 'data', 'guideData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match `id: "sight-1"` and `title: "Hongya Cave"` sequentially
const placesRegex = /id:\s*[\"']([^\"']+)[\"'][^}]*?title:\s*[\"']([^\"']+)[\"']/gs;
let match;
const places = [];

while ((match = placesRegex.exec(content)) !== null) {
    places.push({ id: match[1], title: match[2] });
}

console.log(`Found ${places.length} places to process.`);

const outputDir = path.join(__dirname, '..', 'public', 'images', 'places');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        // Determine the protocol
        const client = url.startsWith('https') ? https : http;

        // Add User-Agent to prevent 403 Forbidden errors from some image hosts
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };

        const request = client.get(url, options, (res) => {
            // Handle redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                return reject(new Error(`Status Code: ${res.statusCode} for ${url}`));
            }

            const file = fs.createWriteStream(dest);
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve(true);
            });

            file.on('error', (err) => {
                fs.unlink(dest, () => reject(err)); // Delete the file if error
            });
        });

        request.on('error', reject);
        // Timeout handling
        request.setTimeout(10000, () => {
            request.destroy();
            reject(new Error(`Timeout fetching ${url}`));
        });
    });
}

// Ensure the local string matches a valid filename
function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

async function scrapeImagesForPlace(place) {
    console.log(`\n🔍 Searching for: [${place.title}]...`);

    try {
        const res = await GOOGLE_IMG_SCRAP({
            search: `${place.title} Chongqing real photo, street view, TripAdvisor`,
            limit: 5, // Fetch more to account for broken links
        });

        if (res && res.result && res.result.length > 0) {
            const downloadedPaths = [];
            let successCount = 0;

            for (let i = 0; i < res.result.length && successCount < 3; i++) {
                const imageUrl = res.result[i].url;
                const extension = imageUrl.split('.').pop().split('?')[0].substr(0, 4) || 'jpg';
                const validExt = ['jpg', 'jpeg', 'png', 'webp'].includes(extension.toLowerCase()) ? extension : 'jpg';

                const filename = `${sanitizeFilename(place.id)}_${successCount + 1}.${validExt}`;
                const destPath = path.join(outputDir, filename);

                try {
                    await downloadImage(imageUrl, destPath);
                    downloadedPaths.push(`/images/places/${filename}`);
                    successCount++;
                    console.log(`✅ Downloaded: ${filename}`);
                } catch (err) {
                    console.log(`❌ Failed to download ${imageUrl}: ${err.message}`);
                }
            }

            if (downloadedPaths.length > 0) {
                // Update the guideData.ts content
                // We will look for the specific place block, then replace its `images: [...]`

                const idRegex = new RegExp(`id:\\s*["']${place.id}["'][\\s\\S]*?images:\\s*\\[[^\\]]*\\]`);
                const blockMatch = content.match(idRegex);

                if (blockMatch) {
                    const newImagesArray = `images: [\n            ${downloadedPaths.map(p => `"${p}"`).join(',\n            ')}\n        ]`;
                    const replaceRegex = new RegExp(`(id:\\s*["']${place.id}["'][\\s\\S]*?)images:\\s*\\[[^\\]]*\\]`);
                    content = content.replace(replaceRegex, `$1${newImagesArray}`);
                }
            }
        } else {
            console.log(`⚠️ No results found for ${place.title}`);
        }
    } catch (error) {
        console.error(`🚨 Error scraping ${place.title}:`, error.message);
    }
}

async function run() {
    console.log('🚀 Starting Google Image Fetcher...\n');

    // Throttle requests to avoid rate limits
    for (let i = 0; i < places.length; i++) {
        await scrapeImagesForPlace(places[i]);
        // Small delay between searches
        await new Promise(r => setTimeout(r, 2000));
    }

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log('\n✅ Finished processing all places and updated guideData.ts');
}

run();
