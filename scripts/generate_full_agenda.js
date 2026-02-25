const fs = require('fs');
const path = require('path');

const generateId = () => Math.random().toString(36).substr(2, 9);

const rawData = [
    {
        "dayNumber": 1,
        "activities": [
            {
                "time": "17:00",
                "title": "Départ pour l'aéroport",
                "description": "Direction Paris-Charles-de-Gaulle T1 pour le début de l'aventure.",
                "location": "Paris",
                "address": "",
                "icon": "🛫",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Paris_Charles_de_Gaulle_Airport_Terminal_1.jpg/800px-Paris_Charles_de_Gaulle_Airport_Terminal_1.jpg"
            },
            {
                "time": "20:20",
                "title": "Vol Paris - Pékin (NH2NKC)",
                "description": "Décollage pour Pékin T3. Vol de nuit de 10h.",
                "location": "Paris CDG T1",
                "address": "Aéroport de Paris-Charles-de-Gaulle T1",
                "icon": "✈️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Air_China_Boeing_777-300ER_%28B-2006%29.jpg/800px-Air_China_Boeing_777-300ER_%28B-2006%29.jpg"
            }
        ]
    },
    {
        "dayNumber": 2,
        "activities": [
            {
                "time": "12:20",
                "title": "Escale à Pékin",
                "description": "Arrivée à l'aéroport international de Pékin T3. Attente pour la correspondance vers Chongqing.",
                "location": "Pékin T3",
                "address": "Beijing Capital International Airport T3",
                "icon": "⏱️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Beijing_Capital_International_Airport_Terminal_3.jpg/800px-Beijing_Capital_International_Airport_Terminal_3.jpg"
            },
            {
                "time": "16:00",
                "title": "Vol Pékin - Chongqing (NH2NKC)",
                "description": "Décollage de Pékin T3. Vol de 2h55 vers Chongqing.",
                "location": "Pékin T3",
                "address": "Aéroport de Pékin T3",
                "icon": "✈️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chongqing_Jiangbei_International_Airport_T3A.jpg/800px-Chongqing_Jiangbei_International_Airport_T3A.jpg"
            },
            {
                "time": "18:55",
                "title": "Arrivée à Chongqing (CKG)",
                "description": "Atterrissage à l'aéroport international de Chongqing Jiangbei T3.",
                "location": "Aéroport CKG",
                "address": "Chongqing Jiangbei International Airport T3",
                "icon": "🛬",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chongqing_Jiangbei_International_Airport_T3A.jpg/800px-Chongqing_Jiangbei_International_Airport_T3A.jpg"
            },
            {
                "time": "20:30",
                "title": "Check-in au Deya Hotel",
                "description": "Installation à Dreeya·德涯酒店 (Dree· Superior Delight Double Bed Room, City View). Adresse: 解放碑洪崖洞店. Votre camp de base pour 11 nuits.",
                "location": "Hôtel",
                "address": "Jiefangbei, près de Hongyadong",
                "icon": "🏨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Jiefangbei_Chongqing.jpg"
            },
            {
                "time": "21:30",
                "title": "Hongyadong (洪崖洞)",
                "description": "Comme vous logez juste à côté, première balade nocturne dans ce complexe illuminé aux airs du Voyage de Chihiro.",
                "location": "Yuzhong",
                "address": "No. 88 Binjiang Road",
                "icon": "🌃",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg"
            }
        ]
    },
    {
        "dayNumber": 3,
        "activities": [
            {
                "time": "09:30",
                "title": "Chongqing Xiaomian (Nouilles)",
                "description": "Le vrai petit-déj local, assis sur un tabouret en plastique dans la rue.",
                "location": "Jiefangbei",
                "address": "Stand de rue près de l'hôtel",
                "icon": "🍜",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Chongqing_noodles.jpg"
            },
            {
                "time": "11:00",
                "title": "Luohan Temple (罗汉寺)",
                "description": "Un temple bouddhiste de 1000 ans caché au milieu des gratte-ciel vertigineux.",
                "location": "Yuzhong",
                "address": "Minzu Road, Yuzhong District",
                "icon": "🛕",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Luohan_Temple_Chongqing.jpg"
            },
            {
                "time": "15:00",
                "title": "Raffles City Mall & Chaotianmen",
                "description": "Le gigantesque navire de verre au confluent des deux fleuves.",
                "location": "Chaotianmen",
                "address": "Changjiang Binjiang Road",
                "icon": "🏢",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Raffles_City_Chongqing_2020.jpg"
            },
            {
                "time": "19:00",
                "title": "Bayi Road Food Street & Hotpot",
                "description": "Découverte de la street food à Bayi Road suivi d'un premier baptême du feu avec la fondue au piment.",
                "location": "Jiefangbei",
                "address": "Bayi Road, Yuzhong District",
                "icon": "🍲",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg"
            }
        ]
    },
    {
        "dayNumber": 4,
        "activities": [
            {
                "time": "10:00",
                "title": "Liziba Monorail Station (李子坝站)",
                "description": "La célèbre station où la ligne 2 du métro traverse littéralement un immeuble.",
                "location": "Yuzhong",
                "address": "Liziba Main Street",
                "icon": "🚇",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Liziba_Monorail_Station.jpg"
            },
            {
                "time": "14:00",
                "title": "Eling Park & TESTBED2 (贰厂)",
                "description": "Parc avec vue panoramique suivi de l'ancienne imprimerie transformée en quartier hipster et artsy.",
                "location": "Eling",
                "address": "Eling Zheng Street",
                "icon": "🎨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Eling_Park_Chongqing.jpg"
            },
            {
                "time": "21:00",
                "title": "Bars & Live Music au Nine Street (九街)",
                "description": "Le cœur de la vie nocturne moderne de Chongqing. Ambiance garantie.",
                "location": "Jiangbei",
                "address": "Jiujie, Guanyinqiao",
                "icon": "🍻",
                "image": "https://upload.wikimedia.org/wikipedia/commons/5/5e/China_nightlife.jpg"
            }
        ]
    },
    {
        "dayNumber": 5,
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
                "description": "Immersion dans l'ancien port de porcelaine préservé : ruelles en pierre, temples et snacks à gogo.",
                "location": "Shapingba",
                "address": "Ciqikou",
                "icon": "🏮",
                "image": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ciqikou_Ancient_Town.jpg"
            },
            {
                "time": "13:30",
                "title": "Mahua & Street-food Ciqikou",
                "description": "Dégustation des tresses de pâte frites (Mahua) et flânerie dans les ruelles.",
                "location": "Ciqikou",
                "address": "Ruelles principales",
                "icon": "🥨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ciqikou_street.jpg"
            },
            {
                "time": "19:00",
                "title": "Dîner Chuan Chuan Xiang (串串香)",
                "description": "La version brochettes du Hotpot. Choisis tes skewers et plonge-les dans le bouillon !",
                "location": "Jiangbei",
                "address": "Autour de Guanyinqiao",
                "icon": "🍢",
                "image": "https://upload.wikimedia.org/wikipedia/commons/5/50/Chuan_chuan_xiang.jpg"
            }
        ]
    },
    {
        "dayNumber": 6,
        "activities": [
            {
                "time": "08:30",
                "title": "Chongqing Zoo (重庆动物园)",
                "description": "Visite matinale pour voir les fameux Pandas Géants, particulièrement craquants quand ils mangent leur bambou.",
                "location": "Jiulongpo",
                "address": "Xijiao Road",
                "icon": "🐼",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chongqing_Zoo.JPG"
            },
            {
                "time": "14:30",
                "title": "Huangjueping Graffiti Art Street",
                "description": "Quartier du Sichuan Fine Arts Institute abritant la rue couverte de graffitis la plus longue du monde.",
                "location": "Jiulongpo",
                "address": "Huangjueping",
                "icon": "🖌️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg"
            },
            {
                "time": "18:00",
                "title": "Shaokao (BBQ Chinois)",
                "description": "Excellentes brochettes grillées au cumin et épices dans les rues étudiantes.",
                "location": "Jiulongpo",
                "address": "Près du campus",
                "icon": "🍗",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chinese_dinner.jpg"
            }
        ]
    },
    {
        "dayNumber": 7,
        "activities": [
            {
                "time": "08:00",
                "title": "Départ pour Wulong Karst",
                "description": "Journée excursion (bus ou train) vers le fabuleux parc national géologique de Wulong.",
                "location": "Wulong",
                "address": "Wulong Karst National Geology Park",
                "icon": "⛰️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Wulong_Karst%2C_Chongqing.jpg/800px-Wulong_Karst%2C_Chongqing.jpg"
            },
            {
                "time": "11:00",
                "title": "Three Natural Bridges (天生三桥)",
                "description": "Randonnée au fond du gouffre impressionnant, lieu de tournage de Transformers 4.",
                "location": "Wulong",
                "address": "Parc",
                "icon": "🌉",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tian_Sheng_San_Qiao_2016.jpg/800px-Tian_Sheng_San_Qiao_2016.jpg"
            },
            {
                "time": "20:30",
                "title": "Retour sur Yuzhong",
                "description": "Dîner réconfortant dans le centre-ville après une grosse journée de marche.",
                "location": "Yuzhong",
                "address": "",
                "icon": "🍚",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Chinese_noodle_soup.jpg"
            }
        ]
    },
    {
        "dayNumber": 8,
        "activities": [
            {
                "time": "10:30",
                "title": "Grand Hall of the People (人民大礼堂)",
                "description": "Majestueux bâtiment emblématique construit en 1951, inspiré de l'architecture Ming/Qing.",
                "location": "Yuzhong",
                "address": "Renmin Road",
                "icon": "🏛️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/Great_Hall_of_the_People_in_Chongqing.jpg"
            },
            {
                "time": "12:00",
                "title": "Three Gorges Museum",
                "description": "Histoire vertigineuse de la région et de la construction du méga-barrage des Trois Gorges.",
                "location": "Yuzhong",
                "address": "Renmin Road (En face du Hall)",
                "icon": "🏺",
                "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Three_Gorges_Museum.jpg"
            },
            {
                "time": "15:30",
                "title": "Shancheng Alley (山城巷)",
                "description": "Une ruelle historique suspendue à flanc de colline, offrant des vues plongeantes sur le Yangtsé.",
                "location": "Yuzhong",
                "address": "Shancheng Alley",
                "icon": "🧗",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg"
            },
            {
                "time": "19:00",
                "title": "Poisson grillé (Kao Yu)",
                "description": "Poisson entier grillé et servi frémissant dans un plat rempli de piments et légumes.",
                "location": "Yuzhong",
                "address": "N'importe quel bon Kao Yu",
                "icon": "🐟",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chinese_dinner.jpg"
            }
        ]
    },
    {
        "dayNumber": 9,
        "activities": [
            {
                "time": "10:00",
                "title": "Café de spécialité & Chill",
                "description": "Détente dans un des nombreux 'aesthetic cafés' de la ville.",
                "location": "Centre-ville",
                "address": "",
                "icon": "☕",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/45/China_cafe.jpg"
            },
            {
                "time": "14:00",
                "title": "Guan Yin Qiao (观音桥)",
                "description": "Le paradis du shopping frénétique. Cherche l'énorme écran 3D sur la place centrale.",
                "location": "Jiangbei",
                "address": "Guanyinqiao",
                "icon": "🛍️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Guanyinqiao_Shopping.jpg"
            },
            {
                "time": "20:00",
                "title": "Balade sur Beibin Road",
                "description": "Promenade sur les berges aménagées de Jiangbei avec la skyline étincelante de Yuzhong en face.",
                "location": "Jiangbei",
                "address": "Beibin Road",
                "icon": "🌃",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chongqing_Jiefangbei_night_view_2019.jpg"
            }
        ]
    },
    {
        "dayNumber": 10,
        "activities": [
            {
                "time": "08:30",
                "title": "Départ pour Dazu Rock Carvings",
                "description": "Excursion vers les fabuleuses sculptures rupestres de Dazu (classées à l'UNESCO).",
                "location": "Dazu",
                "address": "Baoding Mountain",
                "icon": "🪨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Dazu_Rock_Carvings_2010.jpg/800px-Dazu_Rock_Carvings_2010.jpg"
            },
            {
                "time": "12:00",
                "title": "Visite du Mont Baoding",
                "description": "Exploration des fascinants bouddhas géants sculptés dans la roche il y a 800 ans.",
                "location": "Dazu",
                "address": "Site de Baoding",
                "icon": "🧘",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/The_Thousand-hand_Guanyin_at_Dazu.jpg/800px-The_Thousand-hand_Guanyin_at_Dazu.jpg"
            },
            {
                "time": "19:30",
                "title": "Retour & Massage",
                "description": "Golden Impressions Massage ou similaire pour reposer les jambes.",
                "location": "Yuzhong",
                "address": "",
                "icon": "💆",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Chinese_massage_room.jpg"
            }
        ]
    },
    {
        "dayNumber": 11,
        "activities": [
            {
                "time": "11:00",
                "title": "Huguang Guild Hall",
                "description": "Magnifique complexe architectural jaune de la dynastie Qing, dédié au commerce et aux arts.",
                "location": "Yuzhong",
                "address": "Changjiang Binjiang Road",
                "icon": "⛩️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Huguang_Guild_Hall_in_Chongqing.jpg/800px-Huguang_Guild_Hall_in_Chongqing.jpg"
            },
            {
                "time": "16:00",
                "title": "Téléphérique du Yangtsé (长江索道)",
                "description": "Traversée mythique de la 'rivière dorée', au-dessus du Yangtsé, en cabine d'époque.",
                "location": "Péninsule vers Nan'an",
                "address": "Xinhua Road",
                "icon": "🚡",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Yangtze_River_Cableway.jpg"
            },
            {
                "time": "18:30",
                "title": "Point de vue Nanshan (一棵树)",
                "description": "Le fameux point de vue 'One Tree' pour la photo de nuit parfaite de toute la ville.",
                "location": "Nan'an",
                "address": "Nanshan",
                "icon": "⛰️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg"
            }
        ]
    },
    {
        "dayNumber": 12,
        "activities": [
            {
                "time": "11:00",
                "title": "Danzishi Old Street & Achats",
                "description": "Quartier réhabilité et achats de souvenirs (sauce Mala, snacks).",
                "location": "Nan'an",
                "address": "Nanbin Road",
                "icon": "🏘️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg"
            },
            {
                "time": "15:00",
                "title": "Sources thermales (Hot Springs)",
                "description": "Chongqing est la capitale des sources chaudes. Après-midi détente à l'une des sources (Ronghui).",
                "location": "Banlieue",
                "address": "Ronghui Hot Springs",
                "icon": "🧖",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Onsen_Rotenburo.jpg/800px-Onsen_Rotenburo.jpg"
            },
            {
                "time": "19:00",
                "title": "Gros Hotpot d'Adieu 🔥",
                "description": "L'ultime séance de sudation autour de la fondue la plus épicée possible pour faire ses adieux à la ville.",
                "location": "Centre-ville",
                "address": "Le meilleur que t'as trouvé",
                "icon": "🍲",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg"
            }
        ]
    },
    {
        "dayNumber": 13,
        "activities": [
            {
                "time": "06:00",
                "title": "Départ de l'hôtel",
                "description": "Check-out du Deya Hotel et direction l'Aéroport Jiangbei T3.",
                "location": "Jiefangbei",
                "address": "Hôtel",
                "icon": "🏨",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Jiefangbei_Chongqing.jpg"
            },
            {
                "time": "09:05",
                "title": "Vol Chongqing - Pékin (NH2NKC)",
                "description": "Décollage de l'Aéroport Jiangbei T3 vers l'Aéroport de Pékin T3. Vol de 2h25.",
                "location": "Aéroport CKG",
                "address": "Chongqing Jiangbei International Airport T3",
                "icon": "🛫",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chongqing_Jiangbei_International_Airport_T3A.jpg/800px-Chongqing_Jiangbei_International_Airport_T3A.jpg"
            },
            {
                "time": "11:30",
                "title": "Escale à Pékin",
                "description": "Arrivée au T3 de Pékin. Attente de la correspondance.",
                "location": "Aéroport PEK",
                "address": "Beijing Capital International Airport T3",
                "icon": "⏱️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Beijing_Capital_International_Airport_Terminal_3.jpg/800px-Beijing_Capital_International_Airport_Terminal_3.jpg"
            },
            {
                "time": "13:30",
                "title": "Vol de retour Pékin - Paris (NH2NKC)",
                "description": "Décollage de Pékin T3 pour Paris CDG T1. Vol de 10h45.",
                "location": "Pékin T3",
                "address": "Aéroport de Pékin T3",
                "icon": "✈️",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Air_China_Boeing_777-300ER_%28B-2006%29.jpg/800px-Air_China_Boeing_777-300ER_%28B-2006%29.jpg"
            },
            {
                "time": "18:15",
                "title": "Arrivée à Paris",
                "description": "Atterrissage à Paris Charles-de-Gaulle T1. Fin du voyage !",
                "location": "Paris CDG T1",
                "address": "Aéroport CDG T1",
                "icon": "🛬",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Paris_Charles_de_Gaulle_Airport_Terminal_1.jpg/800px-Paris_Charles_de_Gaulle_Airport_Terminal_1.jpg"
            }
        ]
    }
];

const processedData = rawData.map((day, index) => {
    // Start date is April 29th, 2026
    const baseDate = new Date('2026-04-29T12:00:00Z');
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

// The file should have `const DEFAULT_ITINERARY: TripDay[] = [` ... until the end of the array.
// Because we formatted it as an array last time, we replace it again.
const newDefaultStr = `const DEFAULT_ITINERARY: TripDay[] = ${JSON.stringify(processedData, null, 4)};`;
// We match from `const DEFAULT_ITINERARY: TripDay[] = [` until `];` which is followed by `\n\n// Helper`
content = content.replace(/const DEFAULT_ITINERARY: TripDay\[\] = \[[\s\S]*?\];\n\n\/\/ Helper/m, newDefaultStr + '\n\n// Helper');

fs.writeFileSync(targetFile, content);
console.log("DEFAULT_ITINERARY updated to 13 days in useAgenda.ts");
