const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '../public/images/guide');

// Source images that WE KNOW EXIST
const SOURCES = {
    VIEW_CITY: 'Night_Cruise.jpg',
    VIEW_PANORAMA: 'Nanshan_Panorama.jpg',
    VIEW_MARKET: 'Ciqikou_Street.jpg',
    VIEW_MALL: 'Raffles_City.jpg',
    VIEW_STREET: 'Jiefangbei_Night.jpg',
    FOOD_HOTPOT: 'rest_peijie.jpg',
    FOOD_NOODLE: 'rest_wanmian.jpg',
    FOOD_GENERIC: 'rest_chicken.jpg'
};

// Target files that failed download
const TARGETS = [
    // SIGHTS REPAIR
    { dest: 'WFC.jpg', type: 'VIEW_CITY' },
    { dest: 'Longmenhao.jpg', type: 'VIEW_CITY' },
    { dest: 'Testbed_2.jpg', type: 'VIEW_STREET' },
    { dest: 'Chaotianmen_Square.jpg', type: 'VIEW_MALL' },
    { dest: 'Grand_Theatre.jpg', type: 'VIEW_CITY' },
    { dest: 'Guanyin_Bridge.jpg', type: 'VIEW_STREET' },
    { dest: 'Graffiti_Street.jpg', type: 'VIEW_STREET' },
    { dest: 'Zhongshuge.jpg', type: 'VIEW_MALL' },
    { dest: 'Shibati.jpg', type: 'VIEW_MARKET' },
    { dest: 'Hongen_Pagoda.jpg', type: 'VIEW_PANORAMA' },

    // RESTAURANT REPAIR
    { dest: 'rest_retro.jpg', type: 'FOOD_HOTPOT' },
    { dest: 'rest_pipayuan.jpg', type: 'FOOD_HOTPOT' },
    { dest: 'rest_cave.jpg', type: 'FOOD_HOTPOT' },
    { dest: 'rest_soup.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_chaoshou.jpg', type: 'FOOD_NOODLE' },
    { dest: 'rest_teahouse.jpg', type: 'VIEW_MARKET' },
    { dest: 'rest_street.jpg', type: 'VIEW_MARKET' },
    { dest: 'rest_stirfry.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_veg.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_snackclassic.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_xiaoyu.jpg', type: 'FOOD_HOTPOT' },
    { dest: 'rest_fish.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_dumpling.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_skyone.jpg', type: 'VIEW_CITY' },

    // BREAKFAST REPAIR (Assume most failed)
    { dest: 'bf_fat_sister.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_wutan.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_youcha.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_youtiao.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_baozi.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_cifantuan.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_fern.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_douhua.jpg', type: 'FOOD_GENERIC' },
    { dest: 'rest_niurou.jpg', type: 'FOOD_NOODLE' }, // Used in breakfast
    { dest: 'bf_ciba.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_intestine.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_jiza.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_liangmian.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_shengjian.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_congee.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_laziji.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_xiaolongbao.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_omelette.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_dandan.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_soymilk.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_lamb.jpg', type: 'FOOD_NOODLE' },
    { dest: 'bf_jidanbing.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_sanjiaoba.jpg', type: 'FOOD_GENERIC' },
    { dest: 'bf_peasoup.jpg', type: 'FOOD_GENERIC' },

    // SHOPPING REPAIR
    { dest: 'shop_jiefangbei.jpg', type: 'VIEW_STREET' },
    { dest: 'shop_guanyinqiao.jpg', type: 'VIEW_STREET' },
    { dest: 'shop_thering.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_mixc.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_ifs.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_times.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_starlight.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_antique.jpg', type: 'VIEW_MARKET' },
    { dest: 'shop_wholesale.jpg', type: 'VIEW_MARKET' },
    { dest: 'shop_flower.jpg', type: 'VIEW_MARKET' },
    { dest: 'shop_apple.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_sisyphe.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_deptstore.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_shinkong.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_decathlon.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_metro.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_sanxia.jpg', type: 'VIEW_STREET' },
    { dest: 'shop_ikea.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_north.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_bookcity.jpg', type: 'VIEW_MALL' },
    { dest: 'shop_ole.jpg', type: 'VIEW_MALL' },

    // NIGHTLIFE REPAIR
    { dest: 'night_jiujie.jpg', type: 'VIEW_STREET' },
    { dest: 'night_space.jpg', type: 'VIEW_CITY' },
    { dest: 'night_playhouse.jpg', type: 'VIEW_CITY' },
    { dest: 'night_tingfeng.jpg', type: 'VIEW_PANORAMA' },
    { dest: 'night_mao.jpg', type: 'VIEW_STREET' },
    { dest: 'night_hops.jpg', type: 'VIEW_STREET' },
    { dest: 'night_ktv.jpg', type: 'VIEW_MALL' },
    { dest: 'night_horizon.jpg', type: 'VIEW_CITY' },
    { dest: 'night_danzishi.jpg', type: 'VIEW_STREET' },
    { dest: 'night_nuts.jpg', type: 'VIEW_STREET' },
    { dest: 'night_lounge.jpg', type: 'VIEW_CITY' },
    { dest: 'night_bbq.jpg', type: 'FOOD_GENERIC' },
    { dest: 'night_terrace.jpg', type: 'VIEW_CITY' },
    { dest: 'night_revolution.jpg', type: 'VIEW_STREET' },
    { dest: 'night_forest.jpg', type: 'VIEW_PANORAMA' },
    { dest: 'night_jazz.jpg', type: 'VIEW_STREET' }
];

TARGETS.forEach(({ dest, type }) => {
    const srcFile = SOURCES[type];
    const srcPath = path.join(IMG_DIR, srcFile);
    const destPath = path.join(IMG_DIR, dest);

    // Only copy if destination is missing or small (broken)
    let shouldCopy = true;
    if (fs.existsSync(destPath)) {
        const stats = fs.statSync(destPath);
        if (stats.size > 5000) {
            shouldCopy = false; // It exists and is big enough
        }
    }

    if (shouldCopy) {
        if (fs.existsSync(srcPath)) {
            try {
                fs.copyFileSync(srcPath, destPath);
                console.log(`✅ Fixed ${dest} using ${srcFile}`);
            } catch (e) {
                console.error(`❌ Error copying to ${dest}:`, e);
            }
        } else {
            console.warn(`⚠️ Source file not found: ${srcFile} (Cannot fix ${dest})`);
        }
    }
});
