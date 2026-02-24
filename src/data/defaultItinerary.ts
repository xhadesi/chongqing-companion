import { TripDay } from "@/lib/types";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const DEFAULT_ITINERARY: TripDay[] = [
    {
        id: `day-${generateId()}`,
        date: "2026-04-30",
        dayNumber: 1,
        activities: [
            {
                id: generateId(),
                time: "20:30",
                title: "Bayi Road Food Street",
                description: "Premier dîner street-food : xiaomian, brochettes, snacks locaux.",
                location: "Jiefangbei",
                address: "Bayi Road, Yuzhong District",
                icon: "🍢",
                image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Chongqing_Street_Food.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "21:45",
                title: "Hongyadong (Grotte de Hongya)",
                description: "Balade nocturne, photos et découverte des étages illuminés.",
                location: "Yuzhong",
                address: "No. 88 Binjiang Road",
                icon: "🌃",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hongyadong_Chongqing_Night_View.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "22:45",
                title: "Riverside Walk",
                description: "Marche le long de la rivière pour photos nocturnes calmes.",
                location: "Yuzhong",
                address: "Binjiang Road",
                icon: "🚶",
                image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Chongqing_night_river.jpg",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-01",
        dayNumber: 2,
        activities: [
            {
                id: generateId(),
                time: "09:00",
                title: "Petit-déjeuner Xiaomian",
                description: "Nouilles épicées traditionnelles du matin.",
                location: "Centre-ville",
                address: "",
                icon: "☕",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chongqing_noodles.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                title: "Luohan Temple",
                description: "Temple bouddhiste historique et ambiance spirituelle.",
                location: "Yuzhong",
                address: "Minzu Road, Yuzhong",
                icon: "🛕",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Luohan_Temple_Chongqing.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                title: "Déjeuner local simple",
                description: "Petit restaurant local rapide.",
                location: "Yuzhong",
                address: "",
                icon: "🍜",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_food.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                title: "Liziba Monorail",
                description: "Photos iconiques du métro traversant un immeuble.",
                location: "Yuzhong",
                address: "Liziba Main Street",
                icon: "📷",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Liziba_Monorail_Station.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "16:30",
                title: "Chaotianmen Square",
                description: "Vue fleuves + skyline, photos larges.",
                location: "Yuzhong",
                address: "Chaotianmen",
                icon: "🌇",
                image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Chaotianmen_Chongqing.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                title: "Hotpot Chongqing",
                description: "Hotpot très épicé populaire chez les locaux.",
                location: "Centre-ville",
                address: "",
                icon: "🍲",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                title: "Bar chill centre-ville",
                description: "Verre tranquille, ambiance locale.",
                location: "Jiefangbei",
                address: "",
                icon: "🍺",
                image: "https://upload.wikimedia.org/wikipedia/commons/2/23/China_bar_night.jpg",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-02",
        dayNumber: 3,
        activities: [
            {
                id: generateId(),
                time: "09:30",
                title: "Thé & Baozi",
                description: "Petit-déj calme à la chinoise.",
                location: "Centre-ville",
                address: "",
                icon: "🍵",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Baozi.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                title: "Ciqikou Ancient Town",
                description: "Ancien quartier, ruelles, boutiques traditionnelles.",
                location: "Shapingba",
                address: "Ciqikou",
                icon: "🏘️",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ciqikou_Ancient_Town.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                title: "Street-food Ciqikou",
                description: "Snacks locaux et desserts traditionnels.",
                location: "Ciqikou",
                address: "",
                icon: "🍢",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ciqikou_street.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "16:30",
                title: "Ruelles anciennes & Vlog",
                description: "Exploration et prises de vues vlog.",
                location: "Ciqikou",
                address: "",
                icon: "🎥",
                image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                title: "Dîner en ville",
                description: "Restaurant local simple.",
                location: "Centre-ville",
                address: "",
                icon: "🍜",
                image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Chinese_noodle_soup.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "21:00",
                title: "Bubble tea local",
                description: "Dessert et boisson populaire.",
                location: "Jiefangbei",
                address: "",
                icon: "🧋",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Bubble_tea.jpg",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-03",
        dayNumber: 4,
        activities: [
            {
                id: generateId(),
                time: "09:00",
                title: "Chongqing Zoo",
                description: "Observation des pandas géants.",
                location: "Jiulongpo",
                address: "Xijiao Road",
                icon: "🐼",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chongqing_Zoo.JPG",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                title: "Déjeuner près du Zoo",
                description: "Restaurant typique du quartier.",
                location: "Jiulongpo",
                address: "",
                icon: "🍜",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_food.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                title: "Golden Impressions Massage",
                description: "Massage local traditionnel pour se détendre.",
                location: "Centre-ville",
                address: "Yuzhong",
                icon: "💆",
                image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Chinese_massage_room.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "18:30",
                title: "Dîner local",
                description: "Repas simple et rapide.",
                location: "Centre-ville",
                address: "",
                icon: "🍗",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chinese_dinner.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "21:00",
                title: "Bars & Rencontres",
                description: "Bars animés fréquentés par les jeunes.",
                location: "Jiefangbei",
                address: "",
                icon: "🍺",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/China_nightlife.jpg",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-04",
        dayNumber: 5,
        activities: [
            {
                id: generateId(),
                time: "10:30",
                title: "Café Chill",
                description: "Pause café tranquille.",
                location: "Centre-ville",
                address: "",
                icon: "☕",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/45/China_cafe.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                title: "Jiefangbei CBD",
                description: "Shopping, malls, ambiance urbaine.",
                location: "Yuzhong",
                address: "Jiefangbei",
                icon: "🛍️",
                image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Jiefangbei_Chongqing.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                title: "Guanyinqiao Shopping District",
                description: "Quartier shopping très local et vibrant.",
                location: "Jiangbei",
                address: "Guanyinqiao",
                icon: "🛍️",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Guanyinqiao_Shopping.jpg",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                title: "Club / Bar populaire",
                description: "Sortie nocturne animée.",
                location: "Centre-ville",
                address: "",
                icon: "🕺",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/China_club.jpg",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-05",
        dayNumber: 6,
        activities: [
            {
                id: generateId(),
                time: "08:30",
                title: "Départ Dazu Rock Carvings",
                description: "Trajet vers le site UNESCO des sculptures de Dazu.",
                location: "Dazu",
                address: "Gare routière ou Train",
                icon: "🚌",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                title: "Sculptures de Baodingshan",
                description: "Exploration des impressionnantes sculptures bouddhistes.",
                location: "Dazu",
                address: "Baodingshan",
                icon: "🗿",
                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                title: "Déjeuner à Dazu",
                description: "Spécialités locales du comté de Dazu.",
                location: "Dazu",
                address: "",
                icon: "🍲",
                completed: false
            },
            {
                id: generateId(),
                time: "16:30",
                title: "Retour à Chongqing",
                description: "Repos après une longue journée de marche.",
                location: "Hôtel",
                address: "",
                icon: "🛏️",
                completed: false
            },
            {
                id: generateId(),
                time: "19:30",
                title: "Dîner Vue Nanshan",
                description: "Dîner sur la montagne avec vue imprenable sur la ville.",
                location: "Nanshan",
                address: "Yikeshu Viewpoint",
                icon: "🏙️",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-06",
        dayNumber: 7,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                title: "Eling Park",
                description: "Ancien jardin privé avec vue panoramique.",
                location: "Yuzhong",
                address: "Eling",
                icon: "🌳",
                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                title: "Testbed 2 (贰厂)",
                description: "Quartier artistique branché, street art et cafés mignons.",
                location: "Yuzhong",
                address: "Testbed 2",
                icon: "🎨",
                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                title: "Déjeuner fusion",
                description: "Café ou restaurant fusion dans Testbed 2.",
                location: "Testbed 2",
                address: "",
                icon: "☕",
                completed: false
            },
            {
                id: generateId(),
                time: "15:30",
                title: "Yangtze River Cableway",
                description: "Traversée mythique du fleuve en téléphérique.",
                location: "Yuzhong to Nan'an",
                address: "Xinhua Road",
                icon: "🚡",
                completed: false
            },
            {
                id: generateId(),
                time: "17:00",
                title: "Longmenhao Old Street",
                description: "Rues anciennes préservées sur les falaises de Nan'an.",
                location: "Nan'an",
                address: "Nanbin Road",
                icon: "🏘️",
                completed: false
            },
            {
                id: generateId(),
                time: "19:30",
                title: "Dîner Poissons Grillés (Kao Yu)",
                description: "Spécialité locale parfaite pour la soirée.",
                location: "Nan'an",
                address: "",
                icon: "🐟",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-07",
        dayNumber: 8,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                title: "Three Gorges Museum",
                description: "Histoire régionale et de la construction du barrage.",
                location: "Centre-ville",
                address: "People's Square",
                icon: "🏛️",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                title: "Déjeuner Place du Peuple",
                description: "Snacks et restaurants autour du musée.",
                location: "Centre-ville",
                address: "",
                icon: "🥟",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                title: "People's Auditorium",
                description: "Bâtiment iconique style dynastie Ming.",
                location: "Centre-ville",
                address: "",
                icon: "🏯",
                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                title: "Librairie Zhongshuge",
                description: "Architecture incroyable avec des escaliers labyrinthiques.",
                location: "Jiulongpo",
                address: "Zhongdi Square",
                icon: "📚",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                title: "Croisière Nocturne",
                description: "Bateau sur les fleuves Yangtsé et Jialing pour la skyline.",
                location: "Chaotianmen",
                address: "Dock",
                icon: "⛴️",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2024-05-08",
        dayNumber: 9,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                title: "Huangjueping Graffiti Art Street",
                description: "Quartier étudiant recouvert de graffitis géants.",
                location: "Jiulongpo",
                address: "Huangjueping",
                icon: "🖌️",
                completed: false
            },
            {
                id: generateId(),
                time: "12:00",
                title: "Déjeuner Street Food",
                description: "Restaurants pas chers adorés par les artistes locaux.",
                location: "Huangjueping",
                address: "",
                icon: "🍜",
                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                title: "Shancheng Alley",
                description: "Aventure dans les ruelles grimpantes au flanc de la montagne.",
                location: "Yuzhong",
                address: "Shancheng Alley",
                icon: "🪜",
                completed: false
            },
            {
                id: generateId(),
                time: "19:30",
                title: "Dîner Mouton/Fondue Douce",
                description: "Fondue moins épicée pour reposer l'estomac.",
                location: "Yuzhong",
                address: "",
                icon: "🍲",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2024-05-09",
        dayNumber: 10,
        activities: [
            {
                id: generateId(),
                time: "09:30",
                title: "Nanshan Botanical Garden",
                description: "Matinée nature dans les jardins botaniques luxuriants.",
                location: "Nanshan",
                address: "",
                icon: "🌸",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                title: "Déjeuner Nature",
                description: "Restaurant de cuisine familiale dans les bois.",
                location: "Nanshan",
                address: "",
                icon: "🌲",
                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                title: "Laojun Cave",
                description: "Temple taoïste gigantesque adossé à la montagne.",
                location: "Nanshan",
                address: "",
                icon: "🛕",
                completed: false
            },
            {
                id: generateId(),
                time: "18:00",
                title: "Sources Chaudes (Hot Springs)",
                description: "Bains d'eaux thermales extérieurs pour récupérer.",
                location: "Beibei",
                address: "Banyan Tree or similar",
                icon: "♨️",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2024-05-10",
        dayNumber: 11,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                title: "Shibati (Les 18 marches)",
                description: "Balade dans l'ancien quartier restauré au cœur de la ville.",
                location: "Yuzhong",
                address: "Shibati",
                icon: "🏮",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                title: "Déjeuner léger",
                description: "Derniers snacks locaux.",
                location: "Yuzhong",
                address: "",
                icon: "🥟",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                title: "Shopping Souvenirs",
                description: "Achats de cadeaux : thé, épices, poteries.",
                location: "Jiefangbei",
                address: "",
                icon: "🎁",
                completed: false
            },
            {
                id: generateId(),
                time: "17:00",
                title: "Préparation des valises",
                description: "Retour à l'hôtel pour rassembler tes affaires.",
                location: "Hôtel",
                address: "",
                icon: "🎒",
                completed: false
            },
            {
                id: generateId(),
                time: "19:30",
                title: "Dîner d'adieu - Canard Laqué",
                description: "Grand repas final pour fêter la fin du voyage.",
                location: "Centre-ville",
                address: "",
                icon: "🦆",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2024-05-11",
        dayNumber: 12,
        activities: [
            {
                id: generateId(),
                time: "06:00",
                title: "Réveil & Check-out",
                description: "Départ de l'hôtel.",
                location: "Hôtel",
                address: "",
                icon: "🕰️",
                completed: false
            },
            {
                id: generateId(),
                time: "07:00",
                title: "Trajet Aéroport / Gare",
                description: "En route pour quitter la ville.",
                location: "Aéroport",
                address: "",
                icon: "🚕",
                completed: false
            },
            {
                id: generateId(),
                time: "09:30",
                title: "Vol retour",
                description: "Retour en France après un super voyage.",
                location: "Arrivée",
                address: "",
                icon: "🛫",
                completed: false
            }
        ]
    }
];
