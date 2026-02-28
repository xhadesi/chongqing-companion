const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
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
    console.log("Downloading exact photos...");

    // Golden Impressions Reflexology Chongqing (金色印象)
    // Using some known good URLs or we can just use a highly realistic representation from a Chinese site.
    // Let's use some Trip.com / Dianping image URLs if I can find them, or just rely on a script to search.
    // Since we don't have a Bing API key off-hand, I'll use some curated stable Wikimedia/Flickr photos or we can do a quick search.
}

main();
