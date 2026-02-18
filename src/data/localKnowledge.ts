import { Activity } from "@/lib/types";

// Helper to calculate distance (Haversine) could be added later for sorting

export interface LocalRecommendation {
    id: string;
    name: string;
    chineseName: string;
    district: string;
    description: string;
    type: "sight" | "food" | "shopping" | "local" | "transport" | "nightlife";
    rating: number;
    lat: number;
    lng: number;
    keywords: string[]; // Keywords for matching
    image?: string; // Image for UI
}

export const LOCAL_DATA: LocalRecommendation[] = [
    // --- FOOD (HOTPOT) ---
    {
        id: "food-hotpot-peijie",
        name: "Peijie Hotpot",
        chineseName: "佩姐老火锅",
        district: "Yuzhong",
        description: "Le hotpot le plus célèbre. Très épicé, file d'attente légendaire.",
        type: "food",
        rating: 4.8,
        lat: 29.5637,
        lng: 106.5714,
        keywords: ["hotpot", "fondue", "épicé", "peijie", "manger", "restaurant", "dîner"],
        image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "food-hotpot-zhoushifu",
        name: "Zhou Shifu Hotpot",
        chineseName: "周师兄火锅",
        district: "Yuzhong",
        description: "Un classique local, adoré pour ses tripes fraîches et son service.",
        type: "food",
        rating: 4.7,
        lat: 29.556,
        lng: 106.574,
        keywords: ["hotpot", "fondue", "restaurant", "manger", "famille"],
        image: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=800&auto=format&fit=crop"
    },

    // --- FOOD (NOODLES) ---
    {
        id: "food-noodle-xiaomian",
        name: "Nouilles de Rue (Xiaomian)",
        chineseName: "重庆小面",
        district: "Partout",
        description: "Le petit-déjeuner des champions. Nouilles épicées au poivre du Sichuan.",
        type: "food",
        rating: 4.5,
        lat: 29.55,
        lng: 106.55,
        keywords: ["nouilles", "xiaomian", "petit-déjeuner", "matin", "rapide", "pas cher"],
        image: "https://images.unsplash.com/photo-1627207644006-27fcc97808fb?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "food-noodle-suanlafen",
        name: "Dada Suanlafen",
        chineseName: "酸辣粉",
        district: "Jiefangbei",
        description: "Vermicelles de patate douce aigres et épicés. Un délice de rue.",
        type: "food",
        rating: 4.3,
        lat: 29.558,
        lng: 106.578,
        keywords: ["suanlafen", "nouilles", "snack", "épicé", "aigre", "piquant"],
        image: "https://images.unsplash.com/photo-1605333396915-477315594733?q=80&w=800&auto=format&fit=crop"
    },

    // --- SIGHTS (LANDMARKS) ---
    {
        id: "sight-hongya",
        name: "Grotte de Hongya",
        chineseName: "洪崖洞",
        district: "Yuzhong",
        description: "L'iconique stilt house cliffside complex. Magnifique la nuit (19h-23h).",
        type: "sight",
        rating: 4.7,
        lat: 29.5619,
        lng: 106.5786,
        keywords: ["hongya", "grotte", "nuit", "lumière", "photo", "chihiro", "visiter", "incontournable"],
        image: "https://images.unsplash.com/photo-1694655490989-4089c894cc83?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "sight-liziba",
        name: "Métro Liziba",
        chineseName: "李子坝站",
        district: "Yuzhong",
        description: "Le fameux train qui traverse un immeuble résidentiel. Allez sur la plateforme en bas pour la photo.",
        type: "sight",
        rating: 4.4,
        lat: 29.553,
        lng: 106.535,
        keywords: ["métro", "liziba", "insolite", "train", "photo", "visiter"],
        image: "https://images.unsplash.com/photo-1555523995-7e8ae7d3122c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "sight-raffles",
        name: "Raffles City",
        chineseName: "来福士广场",
        district: "Chaotianmen",
        description: "Le 'voilier' futuriste. Mall immense et plateforme d'observation 'The Crystal' en haut.",
        type: "sight",
        rating: 4.6,
        lat: 29.568,
        lng: 106.586,
        keywords: ["raffles", "chaotianmen", "mall", "vue", "hauteur", "moderne", "architecture"],
        image: "https://images.unsplash.com/photo-1627914757343-e38c3523491e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "sight-cablecar",
        name: "Téléphérique du Yangtsé",
        chineseName: "长江索道",
        district: "Yuzhong",
        description: "Traversez le fleuve en volant. Réservez sur WeChat car il y a du monde !",
        type: "sight",
        rating: 4.5,
        lat: 29.559,
        lng: 106.584,
        keywords: ["téléphérique", "câble", "fleuve", "yangtsé", "vue", "transport"],
        image: "https://images.unsplash.com/photo-1548235212-36fa54005e83?q=80&w=800&auto=format&fit=crop"
    },

    // --- NIGHTLIFE ---
    {
        id: "night-9street",
        name: "Rue des Bars (Jiu Jie)",
        chineseName: "九街",
        district: "Jiangbei",
        description: "Le cœur de la vie nocturne. Clubs, bars, et street food toute la nuit.",
        type: "nightlife",
        rating: 4.6,
        lat: 29.582,
        lng: 106.545,
        keywords: ["bar", "club", "fête", "nuit", "boire", "danser", "jiu jie"],
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop"
    },

    // --- SHOPPING ---
    {
        id: "shop-ciqikou",
        name: "Ciqikou Old Town",
        chineseName: "磁器口",
        district: "Shapingba",
        description: "Ancienne ville millénaire. Idéal pour souvenirs, thé, et ambiance traditionnelle.",
        type: "shopping",
        rating: 4.3,
        lat: 29.617,
        lng: 106.452,
        keywords: ["ciqikou", "vieux", "traditionnel", "souvenir", "thé", "histoire", "shopping"],
        image: "https://images.unsplash.com/photo-1598327915598-6bb7433230c6?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "shop-guanyinqiao",
        name: "Guanyinqiao Pedestrian St.",
        chineseName: "观音桥",
        district: "Jiangbei",
        description: "Immense quartier piéton moderne. Les jeunes locaux sortent ici. Écran 3D géant.",
        type: "shopping",
        rating: 4.7,
        lat: 29.575,
        lng: 106.535,
        keywords: ["shopping", "mall", "mode", "jeune", "moderne", "guanyinqiao"],
        image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=800&auto=format&fit=crop"
    },

    // --- TRANSPORT / PRACTICAL ---
    {
        id: "trans-crt",
        name: "CRT (Métro)",
        chineseName: "重庆轨道交通",
        district: "Partout",
        description: "Le meilleur moyen de se déplacer. Utilisez Alipay pour payer (QR Code 'Transport').",
        type: "transport",
        rating: 5.0,
        lat: 29.55,
        lng: 106.55,
        keywords: ["métro", "transport", "bus", "déplacer", "crt", "train"],
        image: "https://images.unsplash.com/photo-1543431692-416b23612d22?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "trans-taxi",
        name: "Taxi Jaune (Yellow Cab)",
        chineseName: "出租车",
        district: "Partout",
        description: "Les 'fous du volant' de Chongqing. Pas cher mais sensations garanties !",
        type: "transport",
        rating: 4.0,
        lat: 29.55,
        lng: 106.55,
        keywords: ["taxi", "voiture", "transport", "jaune"],
        image: "https://images.unsplash.com/photo-1563811771128-44fb74581454?q=80&w=800&auto=format&fit=crop"
    }
];

export function getLocalRecommendations(query: string) {
    const lowerQuery = query.toLowerCase();

    // 1. Check for specific keywords
    const matches = LOCAL_DATA.filter(item =>
        item.keywords.some(k => lowerQuery.includes(k)) ||
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.type.includes(lowerQuery) // e.g. user types "food"
    );

    // 2. Sort by rating if multiple matches
    matches.sort((a, b) => b.rating - a.rating);

    // 3. Format Response
    if (matches.length > 0) {
        // Take top 3
        const top3 = matches.slice(0, 3);
        const names = top3.map(m => m.name).join(", ");

        return {
            text: `(Mode Local) Voici ce que j'ai trouvé pour vous : ${names}.`,
            recommendations: top3
        };
    }

    // 4. Fallback (Random suggestions)
    const randoms = [...LOCAL_DATA].sort(() => 0.5 - Math.random()).slice(0, 3);

    return {
        text: "Je n'ai pas trouvé exactement cela dans ma base locale, mais voici quelques incontournables de Chongqing !",
        recommendations: randoms
    };
}

export function getRandomActivities(count: number = 3): any[] {
    return [...LOCAL_DATA]
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, count)
        .map(item => ({
            title: item.name,
            location: item.district,
            image: item.image,
            // Convert to Activity partial
        }));
}
