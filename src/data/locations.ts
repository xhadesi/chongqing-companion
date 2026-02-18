export interface Location {
    id: string;
    name: string;
    chineseName: string;
    pinyin: string;
    type: "sight" | "food" | "transport" | "hotel";
    description: string;
    district: string;
    coordinates: [number, number]; // [lat, lng]
    openingHours?: string; // e.g. "09:00-22:00"
    recommendedTime?: string[]; // "morning", "afternoon", "evening"
    rating?: number;
    reviewsCount?: number;
    reviewsUrl?: string; // TripAdvisor etc
    story?: string; // Cultural context

    // New fields for Local Gems
    isLocalGem?: boolean;
    tripAdvisorRating?: number; // 0-5
    dazhongRating?: number; // 0-5 (Dianping)
}

export const LOCATIONS: Location[] = [
    {
        id: "hongyadong",
        name: "Hongya Cave",
        chineseName: "洪崖洞",
        pinyin: "Hóngyá Dòng",
        type: "sight",
        description: "Complexe sur pilotis célèbre pour sa ressemblance avec Le Voyage de Chihiro.",
        district: "Yuzhong",
        coordinates: [29.5623, 106.5774],
        openingHours: "11:00-23:00",
        recommendedTime: ["evening"],
        rating: 4.6,
        reviewsCount: 1240,
        tripAdvisorRating: 4.5,
        dazhongRating: 4.8,
        story: "Autrefois une forteresse militaire, ce site est devenu une icône grâce à son architecture Ba traditionnelle 'Diaojiaolou' (maisons sur pilotis). La nuit, c'est magique !",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d1800109-Reviews-Hongya_Cave-Chongqing.html"
    },
    {
        id: "jiefangbei",
        name: "Jiefangbei",
        chineseName: "解放碑",
        pinyin: "Jiěfàng Bēi",
        type: "sight",
        description: "Monument de la Libération, le centre commercial de Chongqing.",
        district: "Yuzhong",
        coordinates: [29.5576, 106.5772],
        openingHours: "24/24",
        recommendedTime: ["afternoon", "evening"],
        rating: 4.4,
        reviewsCount: 850,
        tripAdvisorRating: 4.0,
        dazhongRating: 4.5,
        story: "Le seul monument à avoir survécu aux bombardements de la WW2. Aujourd'hui, c'est le 'Time Square' de Chongqing où tout le monde se retrouve.",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d319521-Reviews-Jiefangbei_Square-Chongqing.html"
    },
    {
        id: "liziba",
        name: "Liziba Station",
        chineseName: "李子坝站",
        pinyin: "Lǐzǐbà Zhàn",
        type: "sight",
        description: "Gare de métro qui traverse un immeuble résidentiel.",
        district: "Yuzhong",
        coordinates: [29.5539, 106.5398],
        openingHours: "06:30-23:00",
        recommendedTime: ["morning", "afternoon"],
        rating: 4.8,
        reviewsCount: 3200,
        tripAdvisorRating: 4.5,
        dazhongRating: 4.7,
        story: "Célèbre sur TikTok ! Les architectes ont construit l'immeuble et la gare ensemble pour gagner de la place dans cette ville montagneuse.",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d13419962-Reviews-Liziba_Station-Chongqing.html"
    },
    {
        id: "raffles",
        name: "Raffles City",
        chineseName: "来福士",
        pinyin: "Láifúshì",
        type: "sight",
        description: "Gratte-ciel futuriste à Chaotianmen.",
        district: "Yuzhong",
        coordinates: [29.5682, 106.5861],
        openingHours: "10:00-22:00",
        recommendedTime: ["afternoon", "evening"],
        rating: 4.5,
        reviewsCount: 400,
        tripAdvisorRating: 4.0,
        dazhongRating: 4.9,
        story: "Surnommé 'Le Voilier', il représente le passé maritime de la ville. Au sommet, 'The Crystal' est un pont aérien impressionnant.",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d19119614-Reviews-Raffles_City_Chongqing-Chongqing.html"
    },
    {
        id: "ciqikou",
        name: "Ciqikou Ancient Town",
        chineseName: "磁器口",
        pinyin: "Cíqìkǒu",
        type: "sight",
        description: "Ancienne ville de porcelaine, rues traditionnelles.",
        district: "Shapingba",
        coordinates: [29.5824, 106.4526],
        openingHours: "08:00-22:00",
        recommendedTime: ["morning", "afternoon"],
        rating: 4.3,
        reviewsCount: 1500,
        tripAdvisorRating: 4.0,
        dazhongRating: 4.2,
        story: "Un port millénaire sur la rivière Jialing. On dit : 'Une dalle de pierre fait une route, et Ciqikou fait une ville'.",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d459929-Reviews-Ciqikou_Ancient_Town-Chongqing.html"
    },
    {
        id: "airport",
        name: "Aéroport Jiangbei",
        chineseName: "江北机场",
        pinyin: "Jiāngběi Jīchǎng",
        type: "transport",
        description: "Aéroport international de Chongqing (CKG).",
        district: "Yubei",
        coordinates: [29.7196, 106.6304],
        story: "Hub principal pour l'ouest de la Chine.",
    },
    {
        id: "loquat",
        name: "Loquat Hill Park",
        chineseName: "枇杷山公园",
        pinyin: "Pípáshān Gōngyuán",
        type: "sight",
        description: "Point de vue élevé sur la ville, moins touristique.",
        district: "Yuzhong",
        coordinates: [29.5512, 106.5678],
        recommendedTime: ["evening"],
        rating: 4.7,
        reviewsCount: 120,
        tripAdvisorRating: 4.5,
        dazhongRating: 4.6,
        isLocalGem: true,
        story: "Le point le plus haut de la péninsule de Yuzhong. Parfait pour voir la ville s'illuminer sans la foule.",
        reviewsUrl: "https://www.tripadvisor.fr/Attraction_Review-g294213-d1800109-Reviews-Hongya_Cave-Chongqing.html"
    },
    {
        id: "guanyinqiao_hotpot",
        name: "Old Street Hotpot",
        chineseName: "老街火锅",
        pinyin: "Lǎo Jiē Huǒguō",
        type: "food",
        description: "Hotpot traditionnel dans une ruelle cachée, adoré des locaux.",
        district: "Jiangbei",
        coordinates: [29.5745, 106.5321],
        recommendedTime: ["evening"],
        rating: 4.9,
        reviewsCount: 50,
        tripAdvisorRating: 0, // Not on TripAdvisor
        dazhongRating: 4.9, // High local score
        isLocalGem: true,
        story: "Pas de menu en anglais, pas de touristes. Juste le vrai goût du hotpot au suif de bœuf. Attention, c'est très épicé !",
    },
    {
        id: "train_north",
        name: "Gare du Nord",
        chineseName: "重庆北站",
        pinyin: "Chóngqìng Běizhàn",
        type: "transport",
        description: "Gare ferroviaire principale (TGV).",
        district: "Yubei",
        coordinates: [29.6083, 106.5494],
        story: "Point de départ principal pour les TGV vers Chengdu et le reste de la Chine.",
    },
    {
        id: "train_west",
        name: "Gare de l'Ouest",
        chineseName: "重庆西站",
        pinyin: "Chóngqìng Xīzhàn",
        type: "transport",
        description: "Nouvelle gare TGV majeure.",
        district: "Shapingba",
        coordinates: [29.5083, 106.4333],
        story: "Une des plus grandes gares du sud-ouest, architecture moderne impressionnante.",
    },
    {
        id: "testbed2",
        name: "Testbed 2 (Eling)",
        chineseName: "二厂文创公园",
        pinyin: "Èr Chǎng",
        type: "sight",
        description: "Ancienne imprimerie devenue zone hipster/artistique.",
        district: "Yuzhong",
        coordinates: [29.5539, 106.5398],
        recommendedTime: ["afternoon"],
        rating: 4.4,
        story: "Lieu de tournage du film 'I Belong to You'. Très photogénique avec vue sur la rivière.",
    },
    {
        id: "train_north",
        name: "Gare du Nord",
        chineseName: "重庆北站",
        pinyin: "Chóngqìng Běizhàn",
        type: "transport",
        description: "Gare ferroviaire principale (TGV).",
        district: "Yubei",
        coordinates: [29.6083, 106.5494],
        story: "Point de départ principal pour les TGV vers Chengdu et le reste de la Chine.",
    },
    {
        id: "train_west",
        name: "Gare de l'Ouest",
        chineseName: "重庆西站",
        pinyin: "Chóngqìng Xīzhàn",
        type: "transport",
        description: "Nouvelle gare TGV majeure.",
        district: "Shapingba",
        coordinates: [29.5083, 106.4333],
        story: "Une des plus grandes gares du sud-ouest, architecture moderne impressionnante.",
    },
    {
        id: "testbed2",
        name: "Testbed 2 (Eling)",
        chineseName: "二厂文创公园",
        pinyin: "Èr Chǎng",
        type: "sight",
        description: "Ancienne imprimerie devenue zone hipster/artistique.",
        district: "Yuzhong",
        coordinates: [29.5539, 106.5398], // Approx near Liziba
        recommendedTime: ["afternoon"],
        rating: 4.4,
        story: "Lieu de tournage du film 'I Belong to You'. Très photogénique avec vue sur la rivière.",
    }
];
