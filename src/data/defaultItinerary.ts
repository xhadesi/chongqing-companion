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
                description: "Atterrissage et trajet hôtel. Tip : Garde l'adresse de l'hôtel en caractères chinois (Hanzi) en grand sur ton tel pour le DiDi/Taxi. Un simple \"Nǐ hǎo\" (Bonjour) avec le sourire au chauffeur !",
                location: "Aéroport -> Hôtel (Jiefangbei)",
                address: "Deya Hotel, Jiefangbei",
                icon: "🛬",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "1h",
                title: "Dîner sur le pouce",
                description: "Brochettes (Shao Kao) ou street food. Ose demander \"Zhège shì shénme?\" (C'est quoi ça ?) en pointant la nourriture. Si tu ne veux pas épicé, dis \"Bù yào là\" (Pas épicé).",
                location: "Jiefangbei",
                icon: "🍢",
                completed: false
            },
            {
                id: generateId(),
                time: "22:30",
                duration: "1h30",
                title: "Balade nocturne Hongyadong",
                description: "L'immense Grotte de Hongya de nuit. Spot photo ultime : sur le pont Qiansimen face au bâtiment. Il y a toujours une foule massive et l'ambiance est incroyable.",
                tips: "Avec ton 1m84, tes cheveux blonds et tes yeux bleus, tu vas attirer 100% des regards ici, tu auras l'impression d'être une célébrité. Reste très droit, marche lentement et confiant. Beaucoup de filles vont vouloir te prendre en photo discrètement. Si tu croises un regard, fais un léger sourire et un signe de tête. Si tu te sens d'attaque, approche avec un \"Hěn piàoliang!\" (C'est très beau !) pour briser la glace.",
                location: "Yuzhong (À pied)",
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
                description: "Petit déj local. Absorbe l'ambiance matinale en t'asseyant sur un tabouret en plastique. Tip : à la fin de ton bol, dis au chef \"Hǎo chī!\" (Délicieux), ils adorent !",
                location: "Yuzhong",
                icon: "🍜",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "2h",
                title: "Rendez-vous Tailleur Sur-Mesure",
                description: "Direction un tailleur premium (type ascenseurs à Jiefangbei, chercher 'Custom Suit' ou un tailleur de style Hong Kong). Mesures et choix des tissus (env. 2000 RMB le costume). Idéal pour se faire tailler un costume ajusté prêt d'ici 5 jours (parfait pour tes dernières soirées bg).",
                location: "Jiefangbei",
                address: "Jiefangbei CBD",
                icon: "👔",
                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "2h30",
                title: "Luohan Temple & Kung Fu Temple",
                description: "Contraste incroyable entre les buildings modernes et l'encens. Demande aux jeunes locaux la signification d'une statue pour initier la discussion, l'aspect culturel marche très bien.",
                location: "Yuzhong",
                address: "Minzu Road, Yuzhong",
                icon: "🛕",
                completed: false
            },
            {
                id: generateId(),
                time: "18:30",
                duration: "2h",
                title: "Shancheng Xiang (Montagne Alley)",
                description: "Ruelles suspendues et salons de thé. Endroit très lent, parfait pour aborder doucement en terrasse chill : \"Kěyǐ gēn nǐmen liáotiān ma?\" (Puis-je discuter avec vous ?).",
                location: "Yuzhong",
                address: "Shancheng Alley",
                icon: "🪜",
                completed: false
            },
            {
                id: generateId(),
                time: "21:00",
                duration: "2h",
                title: "Dîner avec vue sur le fleuve",
                description: "Habille-toi élégant. Si tu dînes, demande une place au bar ou terrasse partagée. Demande galamment \"Zhèr yǒu rén ma?\" (Est-ce que cette place est prise ?).",
                location: "Yuzhong",
                icon: "🍷",
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
                time: "10:00",
                duration: "2h",
                title: "Three Gorges Museum",
                description: "Musée fantastique sur l'histoire de Chongqing et la construction de l'immense Barrage des Trois Gorges. Directement accessible à pied ou en scooter depuis Jiefangbei.",
                location: "Yuzhong",
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
                location: "Yuzhong",
                icon: "🏯",
                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                duration: "4h",
                title: "Photoshoot Traditionnel & Shibati",
                description: "Location d'une tenue historique (Hanfu ou Wuxia) avec un photographe pro dans les superbes ruelles restaurées de Shibati, à deux pas de ton hôtel.",
                tips: "C'est L'ACTIVITÉ ultime pour sociabiliser. Enfile ton Hanfu (choisis un modèle impérial sombre ou blanc immaculé). Avec ton côté européen blond/yeux bleus habillé en seigneur d'époque (tu seras un vrai personnage d'anime vivant !), TOUTES les étudiantes en Hanfu voudront te prendre en photo. La règle d'or : joue le jeu. Si une fille te regarde à 3 mètres de distance, fais un geste gracieux de la main pour l'inviter. Dis : \"Wǒmen kěyǐ yìqǐ pāizhào ma?\" (On prend une photo ensemble ?). À la fin du selfie, sors direct : \"Kěyǐ jiā gè wēixìn ma?\" (On s'ajoute sur WeChat ?). Le taux de réussite est de 100%.",
                location: "Yuzhong",
                address: "Shibati Traditional Custom Area",
                icon: "📸",
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
                time: "09:30",
                duration: "1h",
                title: "Yangtze River Cableway",
                description: "Traversée en téléphérique au dessus du fleuve Yangtsé, un must-do vintage accessible depuis Jiefangbei.",
                location: "Yuzhong -> Nan'an",
                address: "Xinhua Road",
                icon: "🚡",
                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                duration: "1h",
                title: "Liziba Monorail",
                description: "Le célèbre métro qui passe à travers l'immeuble. À voir depuis la rue.",
                location: "Yuzhong Ouest",
                address: "Liziba Station",
                icon: "🚈",
                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                duration: "2h",
                title: "Eling Park & Testbed 2 (贰厂)",
                description: "Ancien parc privé en altitude offrant l'une des meilleures vues sur les deux fleuves (Jialing et Yangtsé), suivi de Testbed 2, le spot hipster #1 des influenceurs.",
                tips: "Testbed 2 est grouillant de jeunes influenceuses qui s'y prennent en photo toute la journée. Assieds-toi chill en terrasse avec un verre. Tu seras le \"Laowai\" (étranger) stylé du coin. Ton look de surfeur grand et jeune (l'effet cheveux clairs / yeux clairs) fera tout le travail. Si tu échanges un regard appuyé, ne force pas la discussion, sors juste poliment ton QR Code WeChat et fais un signe de tête.",
                location: "Yuzhong Ouest",
                address: "Eling & Testbed 2",
                icon: "🌳",
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
                time: "11:00",
                duration: "1h30",
                title: "Dentiste (Détartrage/Carie)",
                description: "Clinique moderne VIP de la ville (service ultra-premium par rapport à l'Europe, matériel high-tech). On commence à traverser la rivière vers Jiangbei.",
                tips: "Montre cette traduction à l'accueil : \"Xǐ Yá\" (Détartrage). Le personnel de santé féminin en Chine, très jeune et professionnel, est incroyablement bienveillant et curieux avec les étrangers, surtout avec ton profil grand blond. Si ton infirmière te demande d'où tu viens à la fin, tu peux tout à fait proposer d'échanger les WeChat pour \"t'entraîner à parler chinois\" (\"Wǒ xiǎng liànxī Zhōngwén\"). C'est une excuse magique.",
                location: "Jiangbei",
                icon: "🦷",
                completed: false
            },
            {
                id: generateId(),
                time: "13:00",
                duration: "4h",
                title: "Shopping VIP avec Personal Shopper",
                description: "Séance privatisée au Starlight 68 Plaza ou à Paradise Walk (Guanyinqiao). L'objectif est de trouver des marques streetwear ou minimalistes asiatiques pour upgrader ton style.",
                tips: "En tant qu'homme de 27 ans blond, fin et grand (1m84), les coupes \"Oversize\" asiatiques t'iront à merveille. Marques à cibler absolument : \n\n- UR (Urban Revivo) : C'est le 'Zara Chinois' en beaucoup plus quali et stylé. Fonce y prendre des vestes fluides et pantalons larges.\n- Randomevent / Roaringwild / CLOT : Marques streetwear chinoises haut de gamme très réputées.\n- Uniqlo / Muji : Pour de superbes basiques intemporels de qualité.\n\nDemande l'avis d'une jeune vendeuse : \"Nǐ juéde zhège zěnmeyàng?\" (Tu penses quoi de ça ?) - c'est la meilleure technique de drague indirecte de la journée.",
                location: "Jiangbei",
                address: "Starlight 68 Plaza",
                icon: "🛍️",
                completed: false
            },
            {
                id: generateId(),
                time: "22:00",
                duration: "3h",
                title: "Nightlife EDM (Nine Street)",
                description: "LE spot absolu de Chongqing (Space Club, Play House, ou les bars KTV). L'ambiance est survoltée, très bruyante, et la jeunesse locale adore faire la fête ici.",
                tips: "Tenue conseillée : Noir, minimaliste, T-shirt moulant pour souligner que tu es svelte, ou chemise fluide ouverte. Tu parais 20 ans, alors joue sur ce côté \"jeune étranger branché\". Le cheat-code ultime en club : approche avec ton tel ouvert sur WeChat et dis \"Jiā gè wēixìn ba?\" (On s'ajoute sur WeChat ?). C'est direct et accepté à 90% pour un profil étranger. Tu finiras vite invité à une table VIP pour faire \"Gānbēi\" (cul sec). Laisse-les t'offrir à boire, c'est leur façon de t'accueillir et de sauver la 'Face'.",
                location: "Jiangbei",
                address: "Nine Street (Jiujie), Guanyinqiao",
                icon: "🪩",
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
                time: "10:00",
                duration: "3h",
                title: "Nanshan Botanical Garden / Laojun Cave",
                description: "Montée sur la Montagne Sud (Nan'an). Exploration du temple taoïste Laojun perché sur la colline.",
                location: "Nan'an",
                icon: "🛕",
                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                duration: "1h30",
                title: "Déjeuner : Hotpot Prémium (Pipa Yuan)",
                description: "L'une des plus célèbres fondues au monde, nichée sur toute une colline (littéralement des centaines de tables sur la montagne).",
                tips: "La base de la fondue est mortelle pour les étrangers. Commande impérativement \"Wēi là\" (légèrement épicé) pour survivre, ou bouillon champignon. C'est le moment parfait pour engager la conversation avec la table voisine si ce sont des jeunes (tu parais 20 ans, la vibe étudiante/jeune pro marchera à fond). Demande de l'aide pour cuire un aliment : \"Zhège zěnme zhǔ?\" (Comment on cuit ça ?), ça les fera rire et brisera la glace.",
                location: "Nan'an",
                icon: "🍲",
                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                duration: "2h",
                title: "Golden Impressions Massage",
                description: "Séance luxueuse de réflexologie plantaire et massage complet. Idéal pour revitaliser les jambes à Nanbin Road.",
                location: "Nan'an",
                icon: "💆",
                completed: false
            },
            {
                id: generateId(),
                time: "20:00",
                duration: "3h",
                title: "Bar VIP Lounge & Cocktails",
                description: "Lounge prestigieux (sol en vagues interactives ou vues dégagées) sur Nanbin Road. Atmosphère très \"Aesthetic\" et tamisée.",
                tips: "C'est l'endroit PARFAIT si tu as rencontré une fille (à Jiangbei ou Shibati) et que tu l'invites à un \"First Date\". La musique y est assez basse pour discuter. Porte le costume ajusté récupéré du tailleur. \n\nRappel crucial du Date: \n- C'est TOI qui paie l'addition à 100%, n'attends pas une seconde d'hésitation.\n- Utilise WeChat Translate en le posant sur la table, c'est très fluide.\n- Regarde-la dans les yeux quand elle parle, même si tu mets 2 secondes à traduire.",
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
                description: "Arriver tôt. Ancien village portuaire à Shapingba, architecture traditionnelle, mahua (torsades frites) et artisanat.",
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
                description: "Campus du Sichuan Fine Arts Institute. Le plus grand quartier de street art d'Asie. Les étudiantes en art adorent s'y promener et s'habillent très fashion.",
                tips: "C'est le repère ultime des jeunes filles créatives de Chongqing. Flâne avec un grand café glacé (Luckin Coffee). Pose-toi sur un banc, observe. Si tu vois une fille avec un style qui te plaît, va la voir direct : \"Nǐ de yīfú hěn hǎokàn, kěyǐ jiā wēixìn ma?\" (Ta tenue est super, on peut s'ajouter sur WeChat ?). Elles ont la vingtaine comme toi, tu vas faire un malheur avec ton apparence.",
                location: "Jiulongpo",
                address: "Huangjueping",
                icon: "🖌️",
                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h",
                title: "Dîner Poissons Grillés (Kao Yu)",
                description: "Poisson entier grillé servi dans un bouillon épicé crépitant.",
                location: "Jiulongpo",
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
                description: "Bateau sur les fleuves pour admirer la skyline cyberpunk de Chongqing d'en bas au niveau de Chaotianmen.",
                location: "Chaotianmen",
                address: "Dock",
                icon: "⛴️",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "3h",
                title: "Bars Mixtes (Locaux & Expats)",
                description: "Helen's / Revolucion Cocktail ou un bar à bière artisanale près du centre. Ambiance internationale et détendue.",
                tips: "Le secret le mieux gardé des expats : la musique y est moins forte qu'au Space Club, et les jeunes Chinoises de 20-25 ans qui sortent ici CHERCHENT activement à rencontrer des occidentaux (elles parlent souvent l'anglais basique). Pose-toi au bar, commande un verre. Infaillible avec ton 1m84 : sois souriant et réponds à leurs regards insistants par un mouvement de tête pour les inviter à s'approcher. Laisse ton charme agir.",
                location: "Centro (Yuzhong)",
                icon: "🍻",
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
                time: "08:30",
                duration: "1h30",
                title: "Trajet Wulong Karst",
                description: "Prendre le train ou bus vers Wulong (environ 2h de trajet). C'est le moment de laisser la ville.",
                location: "Gare / Wulong",
                icon: "🚆",
                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "4h",
                title: "Three Natural Bridges (Wulong)",
                description: "Randonnée dans les gorges karstiques verdoyantes. Vue magistrale.",
                tips: "S'il y a du monde, n'hésite pas à demander poliment à une fille de te prendre en photo avec ton tel: \"Kěyǐ bāng wǒ pāizhào ma?\" (pouvez-vous me prendre en photo ?) en souriant. C'est un excellent prétexte pour sympathiser !",
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
        date: "2026-05-09",
        dayNumber: 10,
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
                time: "10:00",
                duration: "2h",
                title: "Pharmacie Médecine Chinoise (TCM)",
                description: "Visite d'une pharmacie traditionnelle. Ose une consultation du pouls (souvent très bon marché) en demandant simplement : \"Wǒ xiǎng kàn zhōngyī\" (Je veux voir un médecin tcm). Une expérience authentique à raconter.",
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
                title: "Shopping Souvenirs & Balade finale",
                description: "Derniers achats : poivre du Sichuan, thé, spécialités emballées, artisanat local.",
                location: "Jiefangbei / Chaotianmen",
                icon: "🎁",
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
                location: "Deya Hôtel",
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
                description: "Fin d'une aventure épique ! Bon vol !",
                location: "Air",
                icon: "🛫",
                completed: false
            }
        ]
    }
];
