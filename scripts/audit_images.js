// scripts/audit_images.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const ITINERARY_FILE = path.join(__dirname, '../src/data/defaultItinerary.ts');
const PUBLIC_IMG_DIR = path.join(__dirname, '../public/images/itinerary');

if (!fs.existsSync(PUBLIC_IMG_DIR)) {
    fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}

let itineraryContent = fs.readFileSync(ITINERARY_FILE, 'utf8');

// Regex to find image URLs
const imgRegex = /image:\s*"((https?:\/\/[^"]+wikimedia[^"]+))"/g;

let match;
const downloads = [];

while ((match = imgRegex.exec(itineraryContent)) !== null) {
    const fullLine = match[0];
    const url = match[1];

    // Create a filename from the URL
    const filenameParts = url.split('/');
    let filename = filenameParts[filenameParts.length - 1];
    // Remove query params if any
    filename = filename.split('?')[0];

    const baseName = path.basename(filename, path.extname(filename));
    const webpFilename = `${baseName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.webp`;
    const localPath = `/images/itinerary/${webpFilename}`;
    const fullLocalPath = path.join(__dirname, '../public', localPath);

    downloads.push({ url, webpFilename, fullLocalPath, localPath, fullLine });
}

async function downloadAndConvert() {
    console.log(`Found ${downloads.length} images to process.`);

    for (const item of downloads) {
        if (fs.existsSync(item.fullLocalPath)) {
            console.log(`Skipping ${item.webpFilename}, already exists.`);
            // Update the typescript file to point to local
            itineraryContent = itineraryContent.replace(item.fullLine, `image: "${item.localPath}"`);
            continue;
        }

        console.log(`Downloading ${item.url}...`);

        try {
            await new Promise((resolve, reject) => {
                const options = {
                    headers: {
                        'User-Agent': 'ChongqingCompanionBot/1.0 (lucas@example.com)'
                    }
                };

                function handleResponse(response) {
                    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                        https.get(response.headers.location, options, handleResponse).on('error', reject);
                        return;
                    }
                    if (response.statusCode !== 200) {
                        reject(new Error(`Failed to get '${item.url}' (${response.statusCode})`));
                        return;
                    }

                    const chunks = [];
                    response.on('data', chunk => chunks.push(chunk));
                    response.on('end', async () => {
                        const buffer = Buffer.concat(chunks);
                        try {
                            await sharp(buffer)
                                .resize({ width: 800, withoutEnlargement: true }) // Optimize size
                                .webp({ quality: 80 })
                                .toFile(item.fullLocalPath);

                            console.log(`Saved ${item.webpFilename}`);
                            // Replace in content
                            itineraryContent = itineraryContent.replace(item.fullLine, `image: "${item.localPath}"`);
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                    });
                }

                https.get(item.url, options, handleResponse).on('error', reject);
            });
        } catch (e) {
            console.error(`Error processing ${item.url}:`, e);
        }
    }

    fs.writeFileSync(ITINERARY_FILE, itineraryContent);
    console.log("Updated defaultItinerary.ts with local WebP paths.");
}

downloadAndConvert();
