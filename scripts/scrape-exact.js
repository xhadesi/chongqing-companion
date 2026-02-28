const fs = require('fs');
const path = require('path');
const google = require('googlethis');
const https = require('https');

const download = (url, filename) => {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
                return download(res.headers.location, filename).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        });

        req.on('error', err => {
            fs.unlink(filename, () => reject(err));
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error("Timeout"));
        });
    });
};

async function fetchExact(query, prefix, max = 2) {
    console.log(`Searching for: ${query}`);
    try {
        const images = await google.image(query, { safe: false });
        let count = 0;
        let localPaths = [];

        for (let i = 0; i < images.length && count < max; i++) {
            const img = images[i];
            const ext = path.extname(new URL(img.url).pathname) || '.jpg';
            // Simple filter for valid looking images
            if (img.url.startsWith('https') && ['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
                const filename = `${prefix}_${count + 1}${ext}`;
                const dest = path.join(__dirname, '../public/images/places', filename);
                try {
                    await download(img.url, dest);
                    localPaths.push(`/images/places/${filename}`);
                    count++;
                    console.log(`Downloaded ${filename}`);
                } catch (e) {
                    console.error(`Failed to download ${img.url}`);
                }
            }
        }
        return localPaths;
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function main() {
    const skybar = await fetchExact("北纬30°重庆之眼Sparkling Sky Bar", "exact_skybar", 2);
    const rev = await fetchExact("Revolucion Cocktail Chongqing", "exact_rev", 2);
    const spa = await fetchExact("Golden Impressions Chongqing massage", "exact_spa", 2);

    // Now apply to itinerary
    const itineraryPath = path.join(__dirname, '../src/data/defaultItinerary.ts');
    let content = fs.readFileSync(itineraryPath, 'utf8');

    if (skybar.length > 0) {
        content = content.replace(
            /\["\/images\/guide\/night_wfc_bar\.jpg", "\/images\/guide\/night_horizon\.jpg"\]/g,
            `["${skybar.join('", "')}"]`
        );
        console.log("Patched Skybar");
    }

    if (rev.length > 0) {
        content = content.replace(
            /\["\/images\/guide\/night_revolution\.jpg", "\/images\/guide\/night_lounge\.jpg"\]/g,
            `["${rev.join('", "')}"]`
        );
        console.log("Patched Rev");
    }

    if (spa.length > 0) {
        content = content.replace(
            /\["https:\/\/images\.unsplash\.com\/photo-1544161515-4ab6ce6db874\?q=80&w=600&auto=format&fit=crop"\]/g,
            `["${spa.join('", "')}"]`
        );
        console.log("Patched Spa");
    }

    fs.writeFileSync(itineraryPath, content, 'utf8');

    // Bump version
    const hookPath = path.join(__dirname, '../src/hooks/useAgenda.ts');
    let hookContent = fs.readFileSync(hookPath, 'utf8');
    hookContent = hookContent.replace(/v2\.0/g, 'v2.1');
    fs.writeFileSync(hookPath, hookContent, 'utf8');
    console.log("Bumped to v2.1");
}

main();
