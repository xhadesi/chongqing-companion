const fs = require('fs');
const path = require('path');

const generateId = () => Math.random().toString(36).substr(2, 9);

const rawData = [
    {
        "dayNumber": 0,
        "activities": [
            {
                "time": "20:30",
                "title": "Bayi Road Food Street (八一路好吃街)",
                "description": "Premier dîner street-food : xiaomian, brochettes, snacks locaux.",
                "location": "Jiefangbei",
                "address": "Bayi Road, Yuzhong District",
                "icon": "🍢",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chongqing_Jiefangbei_night_view_2019.jpg"
            },
            {
                "time": "21:45",
                "title": "Hongyadong (洪崖洞)",
                "description": "Balade nocturne, photos et découverte des étages illuminés de ce complexe inspiré de Spirited Away.",
                "location": "Yuzhong",
                "address": "No. 88 Binjiang Road",
                "icon": "🌃",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg"
            },
            {
                "time": "22:45",
                "title": "Balade Jialing Riverside",
                "description": "Marche le long de la rivière Jialing pour profiter de la brise et des vues sur Jiangbei.",
                "location": "Yuzhong",
                "address": "Jialing River Binjiang Road",
                "icon": "🚶",
                "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Jialing_River_Chongqing.jpg"
            }
        ]
    },
    {
        "dayNumber": 1,
        "activities": [
            {
                "time": "09:00",
                "title": "Chongqing Xiaomian (Nouilles)",
                "description": "Dégustation du célèbre petit-déjeuner local : les nouilles épicées de Chongqing.",
                "location": "Jiefangbei",
                "address": "N'importe quel petit stand de rue bondé",
                "icon": "🍜",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Chongqing_noodles.jpg"
            },
            {
                "time": "10:30",
                "title": "Luohan Temple (罗汉寺)",
                "description": "Un temple bouddhiste millénaire caché au milieu des gratte-ciel modernes.",
                "location": "Yuzhong",
                "address": "Minzu Road, Yuzhong District",
                "icon": "🛕",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Luohan_Temple_Chongqing.jpg"
            },
            {
                "time": "12:30",
                "title": "Raffles City Mall & Chaotianmen",
                "description": "Exploration du méga-mall de Raffles City et déjeuner dans les food courts.",
                "location": "Chaotianmen",
                "address": "Changjiang Binjiang Road",
                "icon": "🏢",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Raffles_City_Chongqing_2020.jpg"
            },
            {
                "time": "14:30",
                "title": "Liziba Monorail Station (李子坝站)",
                "description": "La fameuse station de la ligne 2 où le train traverse un immeuble résidentiel de 19 étages.",
                "location": "Yuzhong",
                "address": "Liziba Main Street",
                "icon": "🚇",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Liziba_Monorail_Station.jpg"
            },
            {
                "time": "16:00",
                "title": "Eling Park & TESTBED2 (贰厂)",
                "description": "Ancienne imprimerie transformée en quartier artistique hipster avec vue panoramique.",
                "location": "Eling",
                "address": "Eling Zheng Street",
                "icon": "🎨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Eling_Park_Chongqing.jpg"
            },
            {
                "time": "19:00",
                "title": "vrai Hotpot de Chongqing",
                "description": "L'incontournable fondue épicée (mala) dans un restaurant local bruyant et authentique.",
                "location": "Yuzhong",
                "address": "Peu importe, fiez-vous à l'odeur !",
                "icon": "🍲",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg"
            },
            {
                "time": "21:30",
                "title": "Verre au Nine Street (九街)",
                "description": "Le quartier nocturne par excellence de Jiangbei, bars animés et live music.",
                "location": "Jiangbei",
                "address": "Jiujie, Guanyinqiao",
                "icon": "🍻",
                "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/China_bar_night.jpg"
            }
        ]
    },
    {
        "dayNumber": 2,
        "activities": [
            {
                "time": "09:30",
                "title": "Thé & Baozi traditionnels",
                "description": "Petit-déjeuner local classique avec des pains vapeurs farcis.",
                "location": "Shapingba",
                "address": "Près de Ciqikou",
                "icon": "🥟",
                "image": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Baozi.jpg"
            },
            {
                "time": "10:30",
                "title": "Ciqikou Ancient Town (磁器口)",
                "description": "Ancien port de porcelaine préservé : ruelles en pierre, temples et snacks à gogo.",
                "location": "Shapingba",
                "address": "Ciqikou",
                "icon": "🏮",
                "image": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ciqikou_Ancient_Town.jpg"
            },
            {
                "time": "13:30",
                "title": "Mahua & Street-food Ciqikou",
                "description": "Dégustation des tresses de pâte frites (Mahua) et autres spécialités de la vieille ville.",
                "location": "Ciqikou",
                "address": "Ruelles principales",
                "icon": "🥨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ciqikou_street.jpg"
            },
            {
                "time": "16:00",
                "title": "Guan Yin Qiao (观音桥)",
                "description": "L'un des plus grands quartiers commerciaux de Chine, écrans 3D géants et effervescence.",
                "location": "Jiangbei",
                "address": "Guanyinqiao Pedestrian Street",
                "icon": "🛍️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Guanyinqiao_Shopping.jpg"
            },
            {
                "time": "19:00",
                "title": "Dîner Chuan Chuan Xiang (串串香)",
                "description": "La version brochettes du Hotpot, très conviviale.",
                "location": "Jiangbei",
                "address": "Autour de Guanyinqiao",
                "icon": "🍢",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Chinese_noodle_soup.jpg"
            },
            {
                "time": "21:00",
                "title": "Balade au bord de l'eau (Beibin Road)",
                "description": "Promenade nocturne pour admirer la skyline de Yuzhong de l'autre côté du fleuve.",
                "location": "Jiangbei",
                "address": "Beibin Road",
                "icon": "🌃",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chongqing_Jiefangbei_night_view_2019.jpg"
            }
        ]
    },
    {
        "dayNumber": 3,
        "activities": [
            {
                "time": "09:00",
                "title": "Chongqing Zoo (重庆动物园)",
                "description": "Visite matinale pour voir les fameux Pandas Géants quand ils sont les plus actifs.",
                "location": "Jiulongpo",
                "address": "Xijiao Road",
                "icon": "🐼",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chongqing_Zoo.JPG"
            },
            {
                "time": "12:30",
                "title": "Sichuan Cuisine (川菜)",
                "description": "Déjeuner dans un restaurant de cuisine sichuanaise classique (Mapo Tofu, Porc effiloché).",
                "location": "Jiulongpo",
                "address": "Près du zoo ou métro",
                "icon": "🌶️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_food.jpg"
            },
            {
                "time": "15:00",
                "title": "Sichuan Fine Arts Institute (Huangjueping)",
                "description": "Quartier artistique mythique avec la plus longue rue de graffitis au monde.",
                "location": "Jiulongpo",
                "address": "Huangjueping",
                "icon": "🎨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Eling_Park_Chongqing.jpg" // fallback
            },
            {
                "time": "17:30",
                "title": "Téléphérique du Yangtsé (长江索道)",
                "description": "Traversée mythique du fleuve Yangtsé en cabine suspendue au coucher du soleil.",
                "location": "Yuzhong -> Nan'an",
                "address": "Xinhua Road",
                "icon": "🚡",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Yangtze_River_Cableway.jpg"
            },
            {
                "time": "19:30",
                "title": "Point de vue Nanshan (一棵树)",
                "description": "Dîner et point de vue 'One Tree' sur la montagne Nanshan pour la vue nocturne ultime.",
                "location": "Nan'an",
                "address": "Nanshan",
                "icon": "⛰️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg" // fallback
            }
        ]
    },
    {
        "dayNumber": 4,
        "activities": [
            {
                "time": "10:30",
                "title": "Grand Hall of the People (人民大礼堂)",
                "description": "Majestueux bâtiment d'inspiration Ming et Qing, avec la place du peuple.",
                "location": "Yuzhong",
                "address": "Renmin Road",
                "icon": "🏛️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/Great_Hall_of_the_People_in_Chongqing.jpg"
            },
            {
                "time": "11:30",
                "title": "Three Gorges Museum",
                "description": "Histoire du barrage des Trois Gorges et de la région (juste en face du Grand Hall).",
                "location": "Yuzhong",
                "address": "Renmin Road",
                "icon": "🏺",
                "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Three_Gorges_Museum.jpg"
            },
            {
                "time": "14:00",
                "title": "Déjeuner : Poisson grillé (Kao Yu)",
                "description": "Poisson grillé aux épices, une autre grande spécialité locale.",
                "location": "Yuzhong",
                "address": "Autour du musée",
                "icon": "🐟",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chinese_dinner.jpg"
            },
            {
                "time": "16:00",
                "title": "Shancheng Alley (山城巷)",
                "description": "Superbe ruelle accrochée à la falaise, retraçant l'histoire de la 'Ville Montagne'.",
                "location": "Yuzhong",
                "address": "Shancheng Alley",
                "icon": "🧗",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg"
            },
            {
                "time": "19:30",
                "title": "Dernier Hotpot ou Dîner d'adieu",
                "description": "Ultime repas épicé pour bien clôturer le voyage.",
                "location": "Jiefangbei",
                "address": "Centre-ville",
                "icon": "🥘",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg"
            }
        ]
    }
];

const processedData = rawData.map((day, index) => {
    // Generate dates starting from a fake date (e.g., today)
    const baseDate = new Date('2024-10-01');
    baseDate.setDate(baseDate.getDate() + index);

    return {
        id: `day-${index + 1}`,
        date: baseDate.toISOString().split('T')[0],
        dayNumber: index + 1,
        activities: day.activities.map(act => ({
            id: generateId(),
            time: act.time,
            title: act.title,
            description: act.description,
            icon: act.icon,
            location: act.location,
            address: act.address,
            image: act.image,
            completed: false
        }))
    };
});

// Update useAgenda.ts
const targetFile = path.join(__dirname, '../src/hooks/useAgenda.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace the DEFAULT_ITINERARY definition
const regex = /const DEFAULT_ITINERARY: TripDay\[\] = \[.*?\];/s; // simple replace first if exists
if (content.match(/const DEFAULT_ITINERARY: TripDay\[\] = Array\.from/)) {
    // We currently have the Array.from version, replace it
    const newDefaultStr = `const DEFAULT_ITINERARY: TripDay[] = ${JSON.stringify(processedData, null, 4)};`;
    content = content.replace(/const DEFAULT_ITINERARY: TripDay\[\] = Array\.from\(\{[^;]+\);/s, newDefaultStr);
    fs.writeFileSync(targetFile, content);
    console.log("DEFAULT_ITINERARY updated in useAgenda.ts");
} else {
    const newDefaultStr = `const DEFAULT_ITINERARY: TripDay[] = ${JSON.stringify(processedData, null, 4)};`;
    content = content.replace(/const DEFAULT_ITINERARY: TripDay\[\] = \[.*?\];/s, newDefaultStr);
    fs.writeFileSync(targetFile, content);
    console.log("DEFAULT_ITINERARY updated in useAgenda.ts (array version)");
}
