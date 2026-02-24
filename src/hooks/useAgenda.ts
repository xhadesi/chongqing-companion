"use client";

import { useState, useEffect } from "react";
import { TripDay, Activity } from "@/lib/types";

const STORAGE_KEY = "chongqing-agenda";

// Default: Just 3 days to start, user can add more
const DEFAULT_ITINERARY: TripDay[] = [
    {
        "id": "day-1",
        "date": "2024-10-01",
        "dayNumber": 1,
        "activities": [
            {
                "id": "isu8ysdpg",
                "time": "20:30",
                "title": "Bayi Road Food Street (八一路好吃街)",
                "description": "Premier dîner street-food : xiaomian, brochettes, snacks locaux.",
                "icon": "🍢",
                "location": "Jiefangbei",
                "address": "Bayi Road, Yuzhong District",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chongqing_Jiefangbei_night_view_2019.jpg",
                "completed": false
            },
            {
                "id": "l2t2rmai9",
                "time": "21:45",
                "title": "Hongyadong (洪崖洞)",
                "description": "Balade nocturne, photos et découverte des étages illuminés de ce complexe inspiré de Spirited Away.",
                "icon": "🌃",
                "location": "Yuzhong",
                "address": "No. 88 Binjiang Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg",
                "completed": false
            },
            {
                "id": "3pwz5n5wn",
                "time": "22:45",
                "title": "Balade Jialing Riverside",
                "description": "Marche le long de la rivière Jialing pour profiter de la brise et des vues sur Jiangbei.",
                "icon": "🚶",
                "location": "Yuzhong",
                "address": "Jialing River Binjiang Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Jialing_River_Chongqing.jpg",
                "completed": false
            }
        ]
    },
    {
        "id": "day-2",
        "date": "2024-10-02",
        "dayNumber": 2,
        "activities": [
            {
                "id": "lnh06zy81",
                "time": "09:00",
                "title": "Chongqing Xiaomian (Nouilles)",
                "description": "Dégustation du célèbre petit-déjeuner local : les nouilles épicées de Chongqing.",
                "icon": "🍜",
                "location": "Jiefangbei",
                "address": "N'importe quel petit stand de rue bondé",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Chongqing_noodles.jpg",
                "completed": false
            },
            {
                "id": "grhixauga",
                "time": "10:30",
                "title": "Luohan Temple (罗汉寺)",
                "description": "Un temple bouddhiste millénaire caché au milieu des gratte-ciel modernes.",
                "icon": "🛕",
                "location": "Yuzhong",
                "address": "Minzu Road, Yuzhong District",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Luohan_Temple_Chongqing.jpg",
                "completed": false
            },
            {
                "id": "jbqw9vhjk",
                "time": "12:30",
                "title": "Raffles City Mall & Chaotianmen",
                "description": "Exploration du méga-mall de Raffles City et déjeuner dans les food courts.",
                "icon": "🏢",
                "location": "Chaotianmen",
                "address": "Changjiang Binjiang Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Raffles_City_Chongqing_2020.jpg",
                "completed": false
            },
            {
                "id": "hbid3u9v5",
                "time": "14:30",
                "title": "Liziba Monorail Station (李子坝站)",
                "description": "La fameuse station de la ligne 2 où le train traverse un immeuble résidentiel de 19 étages.",
                "icon": "🚇",
                "location": "Yuzhong",
                "address": "Liziba Main Street",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Liziba_Monorail_Station.jpg",
                "completed": false
            },
            {
                "id": "mysmm2z9n",
                "time": "16:00",
                "title": "Eling Park & TESTBED2 (贰厂)",
                "description": "Ancienne imprimerie transformée en quartier artistique hipster avec vue panoramique.",
                "icon": "🎨",
                "location": "Eling",
                "address": "Eling Zheng Street",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Eling_Park_Chongqing.jpg",
                "completed": false
            },
            {
                "id": "yz9lqc5gr",
                "time": "19:00",
                "title": "vrai Hotpot de Chongqing",
                "description": "L'incontournable fondue épicée (mala) dans un restaurant local bruyant et authentique.",
                "icon": "🍲",
                "location": "Yuzhong",
                "address": "Peu importe, fiez-vous à l'odeur !",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg",
                "completed": false
            },
            {
                "id": "z0w0szq2g",
                "time": "21:30",
                "title": "Verre au Nine Street (九街)",
                "description": "Le quartier nocturne par excellence de Jiangbei, bars animés et live music.",
                "icon": "🍻",
                "location": "Jiangbei",
                "address": "Jiujie, Guanyinqiao",
                "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/China_bar_night.jpg",
                "completed": false
            }
        ]
    },
    {
        "id": "day-3",
        "date": "2024-10-03",
        "dayNumber": 3,
        "activities": [
            {
                "id": "0icofe22a",
                "time": "09:30",
                "title": "Thé & Baozi traditionnels",
                "description": "Petit-déjeuner local classique avec des pains vapeurs farcis.",
                "icon": "🥟",
                "location": "Shapingba",
                "address": "Près de Ciqikou",
                "image": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Baozi.jpg",
                "completed": false
            },
            {
                "id": "lvcws3ezp",
                "time": "10:30",
                "title": "Ciqikou Ancient Town (磁器口)",
                "description": "Ancien port de porcelaine préservé : ruelles en pierre, temples et snacks à gogo.",
                "icon": "🏮",
                "location": "Shapingba",
                "address": "Ciqikou",
                "image": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ciqikou_Ancient_Town.jpg",
                "completed": false
            },
            {
                "id": "79l3p9rrn",
                "time": "13:30",
                "title": "Mahua & Street-food Ciqikou",
                "description": "Dégustation des tresses de pâte frites (Mahua) et autres spécialités de la vieille ville.",
                "icon": "🥨",
                "location": "Ciqikou",
                "address": "Ruelles principales",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ciqikou_street.jpg",
                "completed": false
            },
            {
                "id": "zverk4imz",
                "time": "16:00",
                "title": "Guan Yin Qiao (观音桥)",
                "description": "L'un des plus grands quartiers commerciaux de Chine, écrans 3D géants et effervescence.",
                "icon": "🛍️",
                "location": "Jiangbei",
                "address": "Guanyinqiao Pedestrian Street",
                "image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Guanyinqiao_Shopping.jpg",
                "completed": false
            },
            {
                "id": "7wsevj7vz",
                "time": "19:00",
                "title": "Dîner Chuan Chuan Xiang (串串香)",
                "description": "La version brochettes du Hotpot, très conviviale.",
                "icon": "🍢",
                "location": "Jiangbei",
                "address": "Autour de Guanyinqiao",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Chinese_noodle_soup.jpg",
                "completed": false
            },
            {
                "id": "cdlwhdv7g",
                "time": "21:00",
                "title": "Balade au bord de l'eau (Beibin Road)",
                "description": "Promenade nocturne pour admirer la skyline de Yuzhong de l'autre côté du fleuve.",
                "icon": "🌃",
                "location": "Jiangbei",
                "address": "Beibin Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chongqing_Jiefangbei_night_view_2019.jpg",
                "completed": false
            }
        ]
    },
    {
        "id": "day-4",
        "date": "2024-10-04",
        "dayNumber": 4,
        "activities": [
            {
                "id": "3h824yl1a",
                "time": "09:00",
                "title": "Chongqing Zoo (重庆动物园)",
                "description": "Visite matinale pour voir les fameux Pandas Géants quand ils sont les plus actifs.",
                "icon": "🐼",
                "location": "Jiulongpo",
                "address": "Xijiao Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chongqing_Zoo.JPG",
                "completed": false
            },
            {
                "id": "8hp4qtpkd",
                "time": "12:30",
                "title": "Sichuan Cuisine (川菜)",
                "description": "Déjeuner dans un restaurant de cuisine sichuanaise classique (Mapo Tofu, Porc effiloché).",
                "icon": "🌶️",
                "location": "Jiulongpo",
                "address": "Près du zoo ou métro",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_food.jpg",
                "completed": false
            },
            {
                "id": "iva1nctip",
                "time": "15:00",
                "title": "Sichuan Fine Arts Institute (Huangjueping)",
                "description": "Quartier artistique mythique avec la plus longue rue de graffitis au monde.",
                "icon": "🎨",
                "location": "Jiulongpo",
                "address": "Huangjueping",
                "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Eling_Park_Chongqing.jpg",
                "completed": false
            },
            {
                "id": "zqy5tmzvu",
                "time": "17:30",
                "title": "Téléphérique du Yangtsé (长江索道)",
                "description": "Traversée mythique du fleuve Yangtsé en cabine suspendue au coucher du soleil.",
                "icon": "🚡",
                "location": "Yuzhong -> Nan'an",
                "address": "Xinhua Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Yangtze_River_Cableway.jpg",
                "completed": false
            },
            {
                "id": "28q7ange0",
                "time": "19:30",
                "title": "Point de vue Nanshan (一棵树)",
                "description": "Dîner et point de vue 'One Tree' sur la montagne Nanshan pour la vue nocturne ultime.",
                "icon": "⛰️",
                "location": "Nan'an",
                "address": "Nanshan",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Night_view_of_Hongyadong.jpg",
                "completed": false
            }
        ]
    },
    {
        "id": "day-5",
        "date": "2024-10-05",
        "dayNumber": 5,
        "activities": [
            {
                "id": "7mnx1gmdz",
                "time": "10:30",
                "title": "Grand Hall of the People (人民大礼堂)",
                "description": "Majestueux bâtiment d'inspiration Ming et Qing, avec la place du peuple.",
                "icon": "🏛️",
                "location": "Yuzhong",
                "address": "Renmin Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/Great_Hall_of_the_People_in_Chongqing.jpg",
                "completed": false
            },
            {
                "id": "b7120f83h",
                "time": "11:30",
                "title": "Three Gorges Museum",
                "description": "Histoire du barrage des Trois Gorges et de la région (juste en face du Grand Hall).",
                "icon": "🏺",
                "location": "Yuzhong",
                "address": "Renmin Road",
                "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Three_Gorges_Museum.jpg",
                "completed": false
            },
            {
                "id": "trrt68s3g",
                "time": "14:00",
                "title": "Déjeuner : Poisson grillé (Kao Yu)",
                "description": "Poisson grillé aux épices, une autre grande spécialité locale.",
                "icon": "🐟",
                "location": "Yuzhong",
                "address": "Autour du musée",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chinese_dinner.jpg",
                "completed": false
            },
            {
                "id": "31s7dpuuw",
                "time": "16:00",
                "title": "Shancheng Alley (山城巷)",
                "description": "Superbe ruelle accrochée à la falaise, retraçant l'histoire de la 'Ville Montagne'.",
                "icon": "🧗",
                "location": "Yuzhong",
                "address": "Shancheng Alley",
                "image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Old_street_China.jpg",
                "completed": false
            },
            {
                "id": "x8spfc0ae",
                "time": "19:30",
                "title": "Dernier Hotpot ou Dîner d'adieu",
                "description": "Ultime repas épicé pour bien clôturer le voyage.",
                "icon": "🥘",
                "location": "Jiefangbei",
                "address": "Centre-ville",
                "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chongqing_hot_pot.jpg",
                "completed": false
            }
        ]
    }
];

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export function useAgenda() {
    const [days, setDays] = useState<TripDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unscheduled, setUnscheduled] = useState<Activity[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Backward compatibility: if parsed is array of days
                if (Array.isArray(parsed)) {
                    setDays(parsed);
                    setUnscheduled([]);
                } else {
                    // New format: { days: [], unscheduled: [] }
                    setDays(parsed.days || DEFAULT_ITINERARY);
                    setUnscheduled(parsed.unscheduled || []);
                }
            } catch (e) {
                console.error("Failed to parse agenda", e);
                setDays(DEFAULT_ITINERARY);
            }
        } else {
            setDays(DEFAULT_ITINERARY);
        }
        setIsLoading(false);
    }, []);

    // Save to local storage whenever days/unscheduled change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, unscheduled }));
        }
    }, [days, unscheduled, isLoading]);

    const addActivity = (dayId: string | "unscheduled", activity: Omit<Activity, "id" | "completed">) => {
        const newActivity = { ...activity, id: generateId(), completed: false };

        // Check if already exists (simple title match or ID match in description)
        const exists =
            unscheduled.some(u => u.title === activity.title) ||
            days.some(d => d.activities.some(a => a.title === activity.title));

        if (exists) return; // Prevent duplicates

        if (dayId === "unscheduled") {
            setUnscheduled(prev => [...prev, newActivity]);
        } else {
            setDays((prev) =>
                prev.map((day) => {
                    if (day.id === dayId) {
                        return {
                            ...day,
                            activities: [
                                ...day.activities,
                                newActivity,
                            ].sort((a, b) => a.time.localeCompare(b.time)),
                        };
                    }
                    return day;
                })
            );
        }
    };

    const moveActivity = (activityId: string, sourceDayId: string | "unscheduled", targetDayId: string | "unscheduled", newTime?: string) => {
        // Find the activity first
        let activityToMove: Activity | undefined;

        if (sourceDayId === "unscheduled") {
            activityToMove = unscheduled.find(a => a.id === activityId);
            setUnscheduled(prev => prev.filter(a => a.id !== activityId));
        } else {
            const sourceDay = days.find(d => d.id === sourceDayId);
            activityToMove = sourceDay?.activities.find(a => a.id === activityId);
            setDays(prev => prev.map(d => d.id === sourceDayId ? { ...d, activities: d.activities.filter(a => a.id !== activityId) } : d));
        }

        if (!activityToMove) return;

        // Modify time if needed
        if (newTime) activityToMove.time = newTime;

        // Add to target
        if (targetDayId === "unscheduled") {
            // If moving to unscheduled, strip time? Keep it for reference? Let's keep it.
            setUnscheduled(prev => [...prev, activityToMove!]);
        } else {
            setDays(prev => prev.map(d => d.id === targetDayId ? {
                ...d,
                activities: [...d.activities, activityToMove!].sort((a, b) => a.time.localeCompare(b.time))
            } : d));
        }
    };

    // ... existing toggle/delete/addDay/removeDay/updateDate ...

    const toggleActivity = (dayId: string, activityId: string) => {
        setDays((prev) =>
            prev.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        activities: day.activities.map((act) =>
                            act.id === activityId ? { ...act, completed: !act.completed } : act
                        ),
                    }
                    : day
            )
        );
    };

    const deleteActivity = (dayId: string | "unscheduled", activityId: string) => {
        if (dayId === "unscheduled") {
            setUnscheduled(prev => prev.filter(a => a.id !== activityId));
        } else {
            setDays((prev) =>
                prev.map((day) =>
                    day.id === dayId
                        ? {
                            ...day,
                            activities: day.activities.filter((act) => act.id !== activityId),
                        }
                        : day
                )
            );
        }
    };

    const clearUnscheduled = () => {
        setUnscheduled([]);
    };


    const addDay = () => {
        setDays((prev) => {
            const nextDayNum = prev.length + 1;
            const lastDate = prev.length > 0 ? new Date(prev[prev.length - 1].date) : new Date();
            const nextDate = new Date(lastDate);
            nextDate.setDate(lastDate.getDate() + 1);

            return [
                ...prev,
                {
                    id: `day-${generateId()}`,
                    date: nextDate.toISOString().split('T')[0],
                    dayNumber: nextDayNum,
                    activities: [],
                }
            ];
        });
    };

    const removeDay = (dayId: string) => {
        setDays((prev) => prev.filter(d => d.id !== dayId).map((d, i) => ({ ...d, dayNumber: i + 1 })));
    };

    const updateActivity = (dayId: string | "unscheduled", activityId: string, updates: Partial<Activity>) => {
        if (dayId === "unscheduled") {
            setUnscheduled((prev) =>
                prev.map((act) => (act.id === activityId ? { ...act, ...updates } : act))
            );
        } else {
            setDays((prev) =>
                prev.map((day) =>
                    day.id === dayId
                        ? {
                            ...day,
                            activities: day.activities
                                .map((act) => (act.id === activityId ? { ...act, ...updates } : act))
                                .sort((a, b) => a.time.localeCompare(b.time)),
                        }
                        : day
                )
            );
        }
    };

    const updateDate = (dayId: string, newDate: string) => {
        setDays((prev) => prev.map(d => d.id === dayId ? { ...d, date: newDate } : d));
    };

    return { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, clearUnscheduled, addDay, removeDay, updateDate };
}
