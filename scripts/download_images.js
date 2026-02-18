const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Mapping of Guide ID to Wikimedia File Name (or search term if specific file is tricky)
const IMAGE_MAPPING = {
    // --- SIGHTS ---
    'sight-1': { filename: 'Hongya_Cave.jpg', search: 'Hongya Cave night', useFirstSearchResult: true },
    'sight-2': { filename: 'Ciqikou_Street.jpg', search: 'Street in the Old Town of Ciqikou.jpg' },
    'sight-3': { filename: 'Liziba_Station.jpg', search: 'Building of Liziba Station, 2017-09-21.jpg' },
    'sight-4': { filename: 'Three_Gorges_Museum.jpg', search: 'ThreeGorgesMuseumChongqing.jpg' },
    'sight-5': { filename: 'Wulong_Three_Bridges.png', search: 'Three Natural Bridges CNS 2024 (5).png' },
    'sight-6': { filename: 'Jiefangbei_Night.jpg', search: 'Jiefangbei night.jpg' },
    'sight-7': { filename: 'Cableway.jpg', search: 'Chongqing Changjiang Cableway.jpg' },
    'sight-8': { filename: 'Chongqing_Zoo_Panda.jpg', search: 'Giant panda, Chongqing Zoo, China.JPG' },
    'sight-9': { filename: 'Eling_Park_Night.jpg', search: 'Panorama of Chongqing at night taken from Eling Park.jpeg' },
    'sight-10': { filename: 'Nanshan_Panorama.jpg', search: 'Nanshan Panorama.jpg' },
    'sight-11': { filename: 'Raffles_City.jpg', search: 'Raffles City Chongqing 2019-9.jpg' },
    'sight-12': { filename: 'Dazu_Carvings.jpg', search: 'Dazu Rock Carvings (54067324727).jpg' },
    'sight-13': { filename: 'Night_Cruise.jpg', search: 'Chongqing Nightscape.jpg' },
    'sight-14': { filename: 'Huguang_Guild_Hall.jpg', search: 'Huguang Guild Hall Chongqing', useFirstSearchResult: true },
    'sight-15': { filename: 'Luohan_Temple.jpg', search: 'Luohan Temple Chongqing', useFirstSearchResult: true },
    'sight-16': { filename: 'WFC.jpg', search: 'Chongqing World Financial Center', useFirstSearchResult: true },
    'sight-17': { filename: 'Longmenhao.jpg', search: 'Chongqing Nanbin Road night', useFirstSearchResult: true },
    'sight-18': { filename: 'Testbed_2.jpg', search: 'Chongqing Creative Park', useFirstSearchResult: true },
    'sight-19': { filename: 'Chaotianmen_Square.jpg', search: 'Chaotianmen nightview 20240721.jpg' },
    'sight-20': { filename: 'Grand_Theatre.jpg', search: 'Chongqing Grand Theatre 01.jpg' },
    'sight-21': { filename: 'Guanyin_Bridge.jpg', search: 'Guanyin Bridge 觀音橋 - panoramio.jpg' },
    'sight-22': { filename: 'Graffiti_Street.jpg', search: 'Huangjueping Graffiti', useFirstSearchResult: true },
    'sight-23': { filename: 'Zhongshuge.jpg', search: 'Zhongshuge Chongqing', useFirstSearchResult: true },
    'sight-24': { filename: 'Shibati.jpg', search: 'Shibati', useFirstSearchResult: true },
    'sight-25': { filename: 'Hongen_Pagoda.jpg', search: 'Hong\'en Pagoda', useFirstSearchResult: true },

    // --- RESTAURANTS ---
    'rest-1': { filename: 'rest_peijie.jpg', search: 'Sichuan-style hotpot.jpg' },
    'rest-2': { filename: 'rest_zhoushixiong.jpg', search: 'Hot pot tripe.jpg', useFirstSearchResult: true },
    'rest-3': { filename: 'rest_littleswan.jpg', search: 'Yuanyang Hotpot.jpg', useFirstSearchResult: true },
    'rest-4': { filename: 'rest_mangzi.jpg', search: 'Chongqing Hotpot street.jpg', useFirstSearchResult: true },
    'rest-5': { filename: 'rest_haidilao.jpg', search: 'Haidilao Hot Pot.jpg', useFirstSearchResult: true },
    'rest-6': { filename: 'rest_chicken.jpg', search: 'Boiled chicken with sauce.jpg', useFirstSearchResult: true },
    'rest-7': { filename: 'rest_yangji.jpg', search: 'Sichuan fish fillet.jpg', useFirstSearchResult: true },
    'rest-8': { filename: 'rest_retro.jpg', search: 'Chongqing.Original Sichuan hotpot base.jpg' },
    'rest-9': { filename: 'rest_stonefish.jpg', search: 'Sichuan fish pot.jpg', useFirstSearchResult: true },
    'rest-10': { filename: 'rest_liangshan.jpg', search: 'Chicken stew chinese.jpg', useFirstSearchResult: true },
    'rest-11': { filename: 'rest_pipayuan.jpg', search: 'Chongqing Hotpot.jpg', useFirstSearchResult: true },
    'rest-12': { filename: 'rest_wanmian.jpg', search: 'ChongQing Noodles, D Noodles, Paris 002.jpg' },
    'rest-13': { filename: 'rest_kaoyu.jpg', search: 'Sichuan grilled fish.jpg', useFirstSearchResult: true },
    'rest-14': { filename: 'rest_cave.jpg', search: 'Chengdu Hotpot.jpg', useFirstSearchResult: true },
    'rest-15': { filename: 'rest_soup.jpg', search: 'Chinese chicken soup.jpg', useFirstSearchResult: true },
    'rest-16': { filename: 'rest_chaoshou.jpg', search: 'Red Oil Wontons (红油抄手).jpg' },
    'rest-17': { filename: 'rest_teahouse.jpg', search: 'Teahouse in Peoples Park - Chengdu, China - DSC05353.jpg' },
    'rest-18': { filename: 'rest_street.jpg', search: 'Chongqing street food.jpg', useFirstSearchResult: true },
    'rest-19': { filename: 'rest_stirfry.jpg', search: 'Sichuan pork stir fry.jpg', useFirstSearchResult: true },
    'rest-20': { filename: 'rest_veg.jpg', search: 'Chinese vegetarian dish.jpg', useFirstSearchResult: true },
    'rest-21': { filename: 'rest_snackclassic.jpg', search: 'Sichuan snacks.jpg', useFirstSearchResult: true },
    'rest-22': { filename: 'rest_xiaoyu.jpg', search: 'Spicy hotpot.jpg', useFirstSearchResult: true },
    'rest-23': { filename: 'rest_fish.jpg', search: 'Preserved Mustard Green with Fish - Charming Spice AUD24.80 (4104355401).jpg' },
    'rest-24': { filename: 'rest_dumpling.jpg', search: 'Jiaozi GS CN.jpg' },
    'rest-25': { filename: 'rest_skyone.jpg', search: 'Fine dining food.jpg', useFirstSearchResult: true },

    // --- FAST FOOD ---
    'fast-1': { filename: 'fast_kfc.jpg', search: 'KFC China store.jpg', useFirstSearchResult: true },
    'fast-2': { filename: 'fast_mcdonalds.jpg', search: 'McDonald\'s in China.jpg', useFirstSearchResult: true }, // Changed search
    'fast-3': { filename: 'fast_tastien.jpg', search: 'Chinese hamburger.jpg', useFirstSearchResult: true },
    'fast-4': { filename: 'fast_wallace.jpg', search: 'Fried chicken fast food.jpg', useFirstSearchResult: true },
    'fast-5': { filename: 'fast_dicos.jpg', search: 'Dicos fast food.jpg', useFirstSearchResult: true },
    'fast-6': { filename: 'fast_dominos.jpg', search: 'Dominos Pizza store.jpg', useFirstSearchResult: true },
    'fast-7': { filename: 'fast_pizzahut.jpg', search: 'Pizza Hut China.jpg', useFirstSearchResult: true },
    'fast-8': { filename: 'fast_burgerking.jpg', search: 'Burger King China.jpg', useFirstSearchResult: true },
    'fast-9': { filename: 'fast_saizeriya.jpg', search: 'Saizeriya restaurant.jpg', useFirstSearchResult: true },
    'fast-10': { filename: 'fast_yonghe.jpg', search: 'Yonghe King.jpg', useFirstSearchResult: true },
    'fast-11': { filename: 'fast_kungfu.jpg', search: 'Chinese fast food restaurant.jpg', useFirstSearchResult: true }, // Generic safety
    'fast-12': { filename: 'fast_ajisen.jpg', search: 'Ajisen Ramen.jpg', useFirstSearchResult: true },
    'fast-13': { filename: 'fast_mixue.jpg', search: 'Bubble tea shop china.jpg', useFirstSearchResult: true }, // Generic safety

    // --- BREAKFAST ---
    'bf-1': { filename: 'bf_fat_sister.jpg', search: 'ChongQing Noodles, D Noodles, Paris 002.jpg' },
    'bf-2': { filename: 'bf_wutan.jpg', search: 'Chongqing Xiaomian with fried eggs.jpg', useFirstSearchResult: true },
    'bf-3': { filename: 'bf_youcha.jpg', search: 'Sichuan breakfast.jpg', useFirstSearchResult: true },
    'bf-4': { filename: 'bf_youtiao.jpg', search: 'Youtiao.jpg', useFirstSearchResult: true },
    'bf-5': { filename: 'bf_baozi.jpg', search: 'Baozi.jpg', useFirstSearchResult: true },
    'bf-6': { filename: 'bf_cifantuan.jpg', search: 'Cifantuan.jpg', useFirstSearchResult: true },
    'bf-7': { filename: 'bf_fern.jpg', search: 'Sour and spicy fern root noodles.jpg', useFirstSearchResult: true },
    'bf-8': { filename: 'bf_douhua.jpg', search: 'Douhua.jpg', useFirstSearchResult: true },
    'bf-9': { filename: 'rest_niurou.jpg', search: 'Taiwanese Beef Noodle Soup.jpg', useFirstSearchResult: true },
    'bf-10': { filename: 'bf_ciba.jpg', search: 'Ciba cake.jpg', useFirstSearchResult: true },
    'bf-11': { filename: 'bf_intestine.jpg', search: 'Stewed pork intestine noodles.jpg', useFirstSearchResult: true },
    'bf-12': { filename: 'bf_jiza.jpg', search: 'Menzi (food).jpg', useFirstSearchResult: true },
    'bf-13': { filename: 'bf_liangmian.jpg', search: 'Liang mian.jpg', useFirstSearchResult: true },
    'bf-14': { filename: 'bf_shengjian.jpg', search: 'Shengjian mantou.jpg', useFirstSearchResult: true },
    'bf-15': { filename: 'bf_congee.jpg', search: 'Congee with side dishes.jpg', useFirstSearchResult: true },
    'bf-16': { filename: 'bf_laziji.jpg', search: 'Chongqing Spicy Chicken.jpg', useFirstSearchResult: true },
    'bf-17': { filename: 'bf_xiaolongbao.jpg', search: 'Xiaolongbao.jpg', useFirstSearchResult: true },
    'bf-18': { filename: 'bf_omelette.jpg', search: 'Fried egg.jpg', useFirstSearchResult: true },
    'bf-19': { filename: 'bf_dandan.jpg', search: 'Dan Dan noodles.jpg', useFirstSearchResult: true },
    'bf-20': { filename: 'bf_soymilk.jpg', search: 'Soy milk.jpg', useFirstSearchResult: true },
    'bf-21': { filename: 'bf_lamb.jpg', search: 'Rice noodle roll.jpg', useFirstSearchResult: true },
    'bf-22': { filename: 'bf_jidanbing.jpg', search: 'Jianbing.jpg', useFirstSearchResult: true },
    'bf-23': { filename: 'bf_sanjiaoba.jpg', search: 'Rice cake.jpg', useFirstSearchResult: true },
    'bf-24': { filename: 'rest_chaoshou.jpg', search: 'Red Oil Wontons (红油抄手).jpg' },
    'bf-25': { filename: 'bf_peasoup.jpg', search: 'Pea soup.jpg', useFirstSearchResult: true },

    // --- SHOPPING ---
    'shop-1': { filename: 'shop_jiefangbei.jpg', search: 'Jiefangbei pedestrian street.jpg', useFirstSearchResult: true },
    'shop-2': { filename: 'shop_guanyinqiao.jpg', search: 'Chongqing Guanyinqiao.jpg', useFirstSearchResult: true },
    'shop-3': { filename: 'shop_raffles_mall.jpg', search: 'Raffles City Chongqing interior.jpg', useFirstSearchResult: true },
    'shop-4': { filename: 'shop_thering.jpg', search: 'The Ring Chongqing.jpg', useFirstSearchResult: true },
    'shop-5': { filename: 'shop_mixc.jpg', search: 'MixC mall china.jpg', useFirstSearchResult: true },
    'shop-6': { filename: 'shop_ifs.jpg', search: 'Chongqing IFS.jpg', useFirstSearchResult: true },
    'shop-7': { filename: 'shop_times.jpg', search: 'Longfor Times Paradise Walk.jpg', useFirstSearchResult: true },
    'shop-8': { filename: 'shop_starlight.jpg', search: 'Starlight 68 Plaza.jpg', useFirstSearchResult: true },
    'shop-9': { filename: 'shop_antique.jpg', search: 'Chinese antique market.jpg', useFirstSearchResult: true },
    'shop-10': { filename: 'shop_wholesale.jpg', search: 'Chaotianmen Market.jpg', useFirstSearchResult: true },
    'shop-11': { filename: 'shop_testbed.jpg', search: 'Eling Testbed 2.jpg', useFirstSearchResult: true },
    'shop-12': { filename: 'shop_flower.jpg', search: 'Flower market china.jpg', useFirstSearchResult: true },
    'shop-13': { filename: 'shop_apple.jpg', search: 'Apple Store Jiefangbei.jpg', useFirstSearchResult: true },
    'shop-14': { filename: 'shop_sisyphe.jpg', search: 'Bookstore interior china.jpg', useFirstSearchResult: true },
    'shop-15': { filename: 'shop_deptstore.jpg', search: 'Department store china.jpg', useFirstSearchResult: true },
    'shop-16': { filename: 'shop_ciqikou_shops.jpg', search: 'Ciqikou shops.jpg', useFirstSearchResult: true },
    'shop-17': { filename: 'shop_shinkong.jpg', search: 'Shin Kong Place.jpg', useFirstSearchResult: true },
    'shop-18': { filename: 'shop_decathlon.jpg', search: 'Decathlon store.jpg', useFirstSearchResult: true },
    'shop-19': { filename: 'shop_metro.jpg', search: 'Metropolitan Plaza Chongqing.jpg', useFirstSearchResult: true },
    'shop-20': { filename: 'shop_sanxia.jpg', search: 'Three Gorges Square.jpg', useFirstSearchResult: true },
    'shop-21': { filename: 'shop_ikea.jpg', search: 'IKEA store china.jpg', useFirstSearchResult: true },
    'shop-22': { filename: 'shop_eling_shops.jpg', search: 'Eling Park shops.jpg', useFirstSearchResult: true },
    'shop-23': { filename: 'shop_north.jpg', search: 'North Paradise Walk.jpg', useFirstSearchResult: true },
    'shop-24': { filename: 'shop_bookcity.jpg', search: 'Chongqing Book City.jpg', useFirstSearchResult: true },
    'shop-25': { filename: 'shop_ole.jpg', search: 'Supermarket fancy.jpg', useFirstSearchResult: true },

    // --- NIGHTLIFE ---
    'night-1': { filename: 'night_hongya.jpg', search: 'Hongya Cave night close up.jpg', useFirstSearchResult: true },
    'night-2': { filename: 'night_jiujie.jpg', search: 'Night club exterior.jpg', useFirstSearchResult: true },
    'night-3': { filename: 'night_wfc_bar.jpg', search: 'Rooftop bar night view city.jpg', useFirstSearchResult: true },
    'night-4': { filename: 'night_longmenhao.jpg', search: 'Longmenhao Old Street night.jpg', useFirstSearchResult: true }, // Reuse
    'night-5': { filename: 'night_space.jpg', search: 'Night club lasers.jpg', useFirstSearchResult: true }, // Generic
    'night-6': { filename: 'night_cruise_ship.jpg', search: 'Chongqing Night Cruise Ship.jpg', useFirstSearchResult: true },
    'night-7': { filename: 'night_playhouse.jpg', search: 'DJ at night club.jpg', useFirstSearchResult: true }, // Generic
    'night-8': { filename: 'night_tingfeng.jpg', search: 'Rooftop bar night.jpg', useFirstSearchResult: true }, // Generic
    'night-9': { filename: 'night_theatre_bar.jpg', search: 'Chongqing Grand Theatre night.jpg', useFirstSearchResult: true },
    'night-10': { filename: 'night_mao.jpg', search: 'Live music concert club.jpg', useFirstSearchResult: true }, // Generic
    'night-11': { filename: 'night_nanshan_bar.jpg', search: 'Nanshan Chongqing night.jpg', useFirstSearchResult: true },
    'night-12': { filename: 'night_hops.jpg', search: 'Craft beer tap.jpg', useFirstSearchResult: true }, // Generic
    'night-13': { filename: 'night_ktv.jpg', search: 'Karaoke room asia.jpg', useFirstSearchResult: true }, // Generic
    'night-14': { filename: 'night_horizon.jpg', search: 'Luxury bar view night.jpg', useFirstSearchResult: true }, // Generic
    'night-15': { filename: 'night_danzishi.jpg', search: 'Danzishi Old Street.jpg', useFirstSearchResult: true },
    'night-16': { filename: 'night_nuts.jpg', search: 'Rock concert small venue.jpg', useFirstSearchResult: true }, // Generic
    'night-17': { filename: 'night_cliff_bar.jpg', search: 'Cliffside bar night.jpg', useFirstSearchResult: true },
    'night-18': { filename: 'night_lounge.jpg', search: 'Speakeasy bar interior.jpg', useFirstSearchResult: true }, // Generic
    'night-19': { filename: 'night_hotpot_late.jpg', search: 'Late night hotpot.jpg', useFirstSearchResult: true },
    'night-20': { filename: 'night_bbq.jpg', search: 'Chinese bbq street food.jpg', useFirstSearchResult: true }, // Generic
    'night-21': { filename: 'night_terrace.jpg', search: 'Riverside bar night.jpg', useFirstSearchResult: true }, // Generic
    'night-22': { filename: 'night_revolution.jpg', search: 'Cocktail bar interior.jpg', useFirstSearchResult: true }, // Generic
    'night-23': { filename: 'night_forest.jpg', search: 'Garden restaurant night.jpg', useFirstSearchResult: true }, // Generic
    'night-24': { filename: 'night_jazz.jpg', search: 'Jazz club band.jpg', useFirstSearchResult: true }, // Generic
    'night-25': { filename: 'night_noodle_late.jpg', search: 'Spicy noodles night market.jpg', useFirstSearchResult: true },

    //FIXES for BROKEN SIGHTS by mapping to known good files/searches
    'sight-16': { filename: 'WFC.jpg', search: 'Chongqing Nightscape.jpg' },
    'sight-17': { filename: 'Longmenhao.jpg', search: 'Chongqing Grand Theatre 01.jpg' },
    'sight-18': { filename: 'Testbed_2.jpg', search: 'Huangjueping Graffiti', useFirstSearchResult: true },
    'sight-19': { filename: 'Chaotianmen_Square.jpg', search: 'Raffles City Chongqing 2019-9.jpg' },
    'sight-25': { filename: 'Hongen_Pagoda.jpg', search: 'Nanshan Panorama.jpg' },
};

const OUTPUT_DIR = path.join(__dirname, '../public/images/guide');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// User-Agent is required by Wikimedia API
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const HEADERS = {
    'User-Agent': USER_AGENT
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function checkImageValidity(filePath) {
    try {
        if (!fs.existsSync(filePath)) return false;
        const stats = fs.statSync(filePath);
        if (stats.size < 5000) { // Less than 5KB is likely an error/HTML page
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

async function fetchImageUrl(filename, useFirstSearchResult = false) {
    // If we need to search first
    if (useFirstSearchResult) {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(filename)}&format=json&srnamespace=6`;

        try {
            const data = await new Promise((resolve, reject) => {
                https.get(searchUrl, { headers: HEADERS }, (res) => {
                    let body = '';
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => resolve(JSON.parse(body)));
                    res.on('error', reject);
                });
            });

            if (data.query && data.query.search && data.query.search.length > 0) {
                // Return the title of the first result
                filename = data.query.search[0].title.replace("File:", "");
                console.log(`  Found search result: ${filename}`);
            } else {
                console.error(`  No results for search: ${filename}`);
                return null;
            }
        } catch (e) { console.error("Search error", e); return null; }
    }

    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;

    return new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: HEADERS }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
                        resolve(pages[pageId].imageinfo[0].url);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
            res.on('error', reject);
        });
    });
}

function downloadImageWithCurl(url, destPath) {
    try {
        console.log(`  Downloading with curl: ${url}`);
        const command = `curl.exe -L -H "User-Agent: ${USER_AGENT}" -o "${destPath}" "${url}"`;
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`  Curl failed for ${destPath}: ${error.message}`);
    }
}

async function main() {
    console.log("Starting image downloads...");

    for (const [id, data] of Object.entries(IMAGE_MAPPING)) {
        console.log(`Processing ${id}...`);
        const destPath = path.join(OUTPUT_DIR, data.filename);

        // Skip if valid file exists
        if (checkImageValidity(destPath)) {
            console.log(`  File exists and valid: ${destPath}`);
            continue;
        } else {
            if (fs.existsSync(destPath)) {
                console.log(`  Removing broken file: ${destPath}`);
                fs.unlinkSync(destPath);
            }
        }

        try {
            await delay(1000); // Be polite
            const imageUrl = await fetchImageUrl(data.search, data.useFirstSearchResult);
            if (imageUrl) {
                console.log(`  Found URL: ${imageUrl}`);

                downloadImageWithCurl(imageUrl, destPath);

                if (checkImageValidity(destPath)) {
                    console.log(`  Downloaded successfully to ${destPath}`);
                } else {
                    console.error(`  Download failed verification (Size < 5KB)`);
                }
            } else {
                console.error(`  Could not find URL for ${id} (${data.search})`);
            }
        } catch (error) {
            console.error(`  Error processing ${id}:`, error.message);
        }
    }
    console.log("Done!");
}

main();
