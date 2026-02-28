const fs = require('fs');
const https = require('https');

// A simple script to fetch images from DuckDuckGo HTML
function fetchImageFromDDG(query, limit = 2) {
    return new Promise((resolve, reject) => {
        const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' images')}`;
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const regex = /<img[^>]+src="([^">]+)"/g;
                let matches = [];
                let match;
                while ((match = regex.exec(data)) !== null) {
                    let imgUrl = match[1];
                    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
                    if (imgUrl.startsWith('http')) matches.push(imgUrl);
                }
                resolve(matches.slice(0, limit));
            });
        }).on('error', reject);
    });
}

const download = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
        }).on('error', err => {
            fs.unlink(filename, () => reject(err));
        });
    });
};

async function main() {
    try {
        console.log("Fetching images for Sparkling Sky Bar...");
        const skyBarImgs = await fetchImageFromDDG("Sparkling Sky Bar Chongqing", 2);
        console.log("Sky Bar: ", skyBarImgs);

        console.log("Fetching images for Golden Impressions Reflexology...");
        const spaImgs = await fetchImageFromDDG("Golden Impressions Reflexology Chongqing", 1);
        console.log("Spa: ", spaImgs);

        console.log("Fetching images for Revolucion Cocktail Chongqing...");
        const revImgs = await fetchImageFromDDG("Revolucion Cocktail Chongqing", 2);
        console.log("Revolucion: ", revImgs);

        // Download them
        const path = require('path');
        const imgPath = path.join(__dirname, '../public/images/places/');

        let idx = 1;
        for (const url of skyBarImgs) {
            await download(url, path.join(imgPath, `exact_skybar_${idx++}.jpg`));
        }
        idx = 1;
        for (const url of spaImgs) {
            await download(url, path.join(imgPath, `exact_spa_${idx++}.jpg`));
        }
        idx = 1;
        for (const url of revImgs) {
            await download(url, path.join(imgPath, `exact_rev_${idx++}.jpg`));
        }
        console.log("Done downloading.");
    } catch (e) {
        console.error(e);
    }
}

main();
