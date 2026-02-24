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
                time: "20:00",
                duration: "1h",
                title: "Arrivée & Check-in",
                description: "Atterrissage, récupération des bagages, trajet jusqu'à l'hôtel et check-in.",
                location: "Aéroport -> Hôtel",
                address: "Chongqing City Center",
                icon: "🛬",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "1h",
                title: "Dîner sur le pouce",
                description: "Dîner rapide (brochettes, fast food local ou xiaomian) près de l'hôtel après le check-in.",
                location: "Jiefangbei",
                icon: "🍢",
                completed: false
            },
            {
                id: generateId(),
                time: "22:30",
                duration: "1h30",
                title: "Balade nocturne Hongyadong",
                description: "Petite marche digestive pour voir la Grotte de Hongya illuminée de nuit si pas trop fatigué.",
                location: "Yuzhong",
                address: "No. 88 Binjiang Road",
                icon: "🌃",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hongyadong_Chongqing_Night_View.jpg",
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
                time: "09:30",
                duration: "1h",
                title: "Xiaomian Traditionnel",
                description: "Petit-déjeuner local : un bol de Xiaomian (nouilles épicées de Chongqing) dans un boui-boui.",
                location: "Yuzhong",
                icon: "🍜",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "2h",
                title: "Shopping Malls (Jiefangbei)",
                description: "Exploration des plus grands malls : WFC Mall, Times Square et Park108. Parfait pour la mode et la tech.",
                location: "Jiefangbei",
                address: "Jiefangbei Pedestrian Street",
                icon: "🛍️",
                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                duration: "1h30",
                title: "Déjeuner : Hotpot",
                description: "Premier vrai hotpot (fondue sichuanaise) ! Demander \"Wei La\" (légèrement épicé) pour survivre au premier round.",
                location: "Jiefangbei",
                icon: "🍲",
                completed: false
            },
            {
                id: generateId(),
                time: "15:30",
                duration: "2h30",
                title: "Luohan Temple & Kung Fu Temple",
                description: "Temple bouddhiste au milieu des gratte-ciels, suivi d'une démonstration ou visite d'un temple martial.",
                location: "Yuzhong",
                address: "Minzu Road, Yuzhong",
                icon: "🛕",
                completed: false
            },
            {
                id: generateId(),
                time: "22:00",
                duration: "3h",
                title: "Nightlife : Nine Street (Jiujie)",
                description: "Le quartier de la fête à Chongqing. Clubs recommandés : Space Club ou Play House. Très animé jusqu'à l'aube.",
                location: "Jiangbei",
                address: "Nine Street (Jiujie), Guanyinqiao",
                icon: "🪩",
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
                time: "11:00",
                duration: "1h30",
                title: "Dentiste (Détartrage/Carie)",
                description: "Rendez-vous à la clinique dentaire moderne pour un check-up et détartrage.",
                location: "Yubei / Jiangbei",
                icon: "🦷",
                completed: false
            },
            {
                id: generateId(),
                time: "13:00",
                duration: "4h",
                title: "Guanyinqiao & Outlets",
                description: "Déjeuner rapide puis après-midi shopping. Visite d'un Outlet de Marques (type Florentia Village) ou exploration mode locale à Guanyinqiao.",
                location: "Jiangbei",
                address: "Guanyinqiao Pedestrian Street",
                icon: "👗",
                completed: false
            },
            {
                id: generateId(),
                time: "18:30",
                duration: "2h",
                title: "Shancheng Xiang (Mountain City Alley)",
                description: "Ruelles suspendues à flanc de colline. Belles vues sur le fleuve au crépuscule. Dîner sur le pouce dans l'allée.",
                location: "Yuzhong",
                address: "Shancheng Alley",
                icon: "🪜",
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
                time: "08:30",
                duration: "1h30",
                title: "Trajet Wulong Karst",
                description: "Prendre le train ou bus vers Wulong (environ 2h de trajet).",
                location: "Gare / Wulong",
                icon: "🚆",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "4h",
                title: "Three Natural Bridges (Wulong)",
                description: "Randonnée magnifique dans les gorges karstiques (lieu de tournage de Transformers 4). Vues vertigineuses.",
                location: "Wulong Karst",
                address: "Wulong District",
                icon: "⛰️",
                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                duration: "2h",
                title: "Grotte de Furong",
                description: "L'une des plus belles grottes stalactites de Chine.",
                location: "Wulong",
                icon: "🦇",
                completed: false
            },
            {
                id: generateId(),
                time: "18:00",
                duration: "2h",
                title: "Retour à l'hôtel",
                description: "Trajet retour vers le centre de Chongqing, repos et dîner près de l'hôtel.",
                location: "Yuzhong",
                icon: "🚌",
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
                time: "10:00",
                duration: "2h",
                title: "Pharmacie Médecine Chinoise (TCM)",
                description: "Visite d'une grande pharmacie traditionnelle (ex: Tongrentang). Achat d'herbes, ginseng ou consultation avec un médecin traditionnel (pouls).",
                location: "Jiefangbei",
                icon: "🌿",
                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                duration: "1h30",
                title: "Déjeuner Wallace",
                description: "Le KFC chinois par excellence ! Poulet frit épicé et burgers savoureux.",
                location: "Centre-ville",
                icon: "🍟",
                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                duration: "3h",
                title: "Shibati (Les 18 Marches)",
                description: "Vieux quartier récemment restauré connectant le haut et le bas de la ville. Architecture Qing et Ming, nombreux spots photos et salons de thé.",
                location: "Yuzhong",
                address: "Shibati Traditional Custom Area",
                icon: "🏮",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h",
                title: "Dîner Poissons Grillés (Kao Yu)",
                description: "Poisson entier grillé servi dans un bouillon épicé crépitant.",
                location: "Nan'an",
                icon: "🐟",
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
                duration: "1h30",
                title: "Départ Dazu Rock Carvings",
                description: "Trajet vers le site UNESCO des sculptures rupestres de Dazu.",
                location: "Dazu",
                address: "Gare routière ou Train",
                icon: "🚌",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "3h",
                title: "Sculptures de Baodingshan",
                description: "Exploration des impressionnantes sculptures bouddhistes taillées dans la roche, dont le célèbre Bouddha couché.",
                location: "Dazu",
                address: "Baodingshan",
                icon: "🗿",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "1h30",
                title: "Déjeuner à Dazu",
                description: "Spécialités locales du comté avant le retour.",
                location: "Dazu",
                icon: "🍲",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "3h",
                title: "Nuit à Nan'an & Cocktails",
                description: "Nanbin Road pour la vue de nuit sur Yuzhong, suivi d'un bar lounge élégant au bord du fleuve.",
                location: "Nan'an",
                address: "Nanbin Road",
                icon: "🍸",
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
                time: "10:30",
                duration: "3h",
                title: "Ciqikou Ancient Town",
                description: "Arriver tôt. Ancien village portuaire, architecture traditionnelle, mahua (torsades frites) et artisanat.",
                location: "Shapingba",
                address: "Ciqikou",
                icon: "🏘️",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "2h",
                title: "Graffiti Art Street (Huangjueping)",
                description: "La plus longue rue de graffitis au monde, ambiance campus étudiant (Sichuan Fine Arts Institute).",
                location: "Jiulongpo",
                address: "Huangjueping",
                icon: "🖌️",
                completed: false
            },
            {
                id: generateId(),
                time: "17:00",
                duration: "1h",
                title: "Liziba Monorail",
                description: "Le célèbre métro qui passe à travers l'immeuble. À voir depuis la rue.",
                location: "Yuzhong",
                address: "Liziba Station",
                icon: "🚈",
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
                duration: "2h",
                title: "Three Gorges Museum",
                description: "Musée fantastique sur l'histoire de Chongqing et la construction de l'immense Barrage des Trois Gorges.",
                location: "Centre-ville",
                address: "People's Square",
                icon: "🏛️",
                completed: false
            },
            {
                id: generateId(),
                time: "12:00",
                duration: "1h",
                title: "People's Auditorium",
                description: "Imposant bâtiment circulaire face au musée, inspiré du Temple du Ciel de Pékin.",
                location: "Centre-ville",
                icon: "🏯",
                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                duration: "2h",
                title: "Eling Park",
                description: "Ancien parc privé en altitude offrant l'une des meilleures vues sur les deux fleuves (Jialing et Yangtsé).",
                location: "Yuzhong",
                address: "Eling",
                icon: "🌳",
                completed: false
            },
            {
                id: generateId(),
                time: "16:30",
                duration: "2h",
                title: "Testbed 2 (贰厂)",
                description: "Ancienne imprimerie transformée en centre artistique hipster, cafés, boutiques design.",
                location: "Yuzhong",
                address: "Testbed 2",
                icon: "🎨",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-08",
        dayNumber: 9,
        activities: [
            {
                id: generateId(),
                time: "09:00",
                duration: "3h",
                title: "Chongqing Zoo (Pandas!)",
                description: "Matinée au zoo pour voir les pandas géants et pandas roux lorsqu'ils sont le plus actifs.",
                location: "Jiulongpo",
                address: "Xijiao Road",
                icon: "🐼",
                completed: false
            },
            {
                id: generateId(),
                time: "13:00",
                duration: "2h",
                title: "Librairie Zhongshuge",
                description: "La librairie la plus magique du monde, design Inception avec ses escaliers croisés et plafonds miroirs.",
                location: "Jiulongpo",
                address: "Zhongdi Square",
                icon: "📚",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h",
                title: "Croisière Nocturne",
                description: "Bateau sur les fleuves pour admirer la skyline cyberpunk de Chongqing d'en bas.",
                location: "Chaotianmen",
                address: "Dock",
                icon: "⛴️",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-09",
        dayNumber: 10,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                duration: "3h",
                title: "Nanshan Botanical Garden / Laojun Cave",
                description: "Montée sur la Montagne Sud. Exploration du temple taoïste Laojun perché sur la colline.",
                location: "Nanshan",
                icon: "🛕",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "2h",
                title: "Golden Impressions Massage",
                description: "Séance luxueuse de réflexologie plantaire et massage complet. Idéal pour revitaliser les jambes après l'ascension.",
                location: "Centre-ville",
                icon: "💆",
                completed: false
            },
            {
                id: generateId(),
                time: "19:30",
                duration: "2h",
                title: "Dîner Mouton Doux",
                description: "Chuan Chuan Xiang (brochettes) ou bouillon clair pour reposer un peu l'estomac du piment.",
                location: "Yuzhong",
                icon: "🍲",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-10",
        dayNumber: 11,
        activities: [
            {
                id: generateId(),
                time: "10:30",
                duration: "1h",
                title: "Yangtze River Cableway",
                description: "Traversée en téléphérique au dessus du fleuve Yangtsé, un must-do vintage.",
                location: "Yuzhong",
                address: "Xinhua Road",
                icon: "🚡",
                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                duration: "3h",
                title: "Shopping Souvenirs & Balade finale",
                description: "Derniers achats : poivre du Sichuan, thé, spécialités emballées, artisanat local.",
                location: "Jiefangbei / Chaotianmen",
                icon: "🎁",
                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                duration: "2h",
                title: "Valises & Relaxation",
                description: "Retour à l'hôtel, organisation des valises (Checklists Baggage!).",
                location: "Hôtel",
                icon: "🎒",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h30",
                title: "Dîner d'adieu - Gastronomie Chinoise",
                description: "Canard laqué ou grand banquet dans un restaurant raffiné pour célébrer le voyage.",
                location: "Yuzhong",
                icon: "🦆",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-11",
        dayNumber: 12,
        activities: [
            {
                id: generateId(),
                time: "07:00",
                duration: "1h",
                title: "Réveil & Check-out",
                description: "On vérifie une dernière fois les tiroirs avec la Check-list Départ de l'appli.",
                location: "Hôtel",
                icon: "🕰️",
                completed: false
            },
            {
                id: generateId(),
                time: "08:00",
                duration: "1h",
                title: "Trajet Aéroport",
                description: "En route pour l'aéroport Jiangbei (CKG). Montrer l'appli Taxi pour la traduction.",
                location: "Aéroport (CKG)",
                icon: "🚕",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "12h",
                title: "Vol retour en France",
                description: "Fin d'une aventure épique et épicée ! Bon vol !",
                location: "Air",
                icon: "🛫",
                completed: false
            }
        ]
    }
];
