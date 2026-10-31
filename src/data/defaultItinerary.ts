import { TripDay } from "@/lib/types";

const generateId = () => Math.random().toString(36).substr(2, 9);

const getFormattedDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
};

export const DEFAULT_ITINERARY: TripDay[] = [
    {
        id: `day-${generateId()}`,
        date: getFormattedDate(0),
        dayNumber: 1,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                duration: "2h",
                title: "Arrivée & Installation",
                chineseTitle: "入住酒店",
                description: "Installation à l'hôtel, récupération de l'eSIM et premiers repères dans le quartier.",
                location: "Chongqing",
                completed: false
            },
            {
                id: generateId(),
                time: "18:00",
                duration: "3h",
                title: "Hongyadong de Nuit & Dîner Hotpot",
                chineseTitle: "洪崖洞夜景 & 火锅",
                description: "Vue spectaculaire sur les maisons sur pilotis illuminées et premier dîner de fondue au bord du fleuve.",
                location: "Yuzhong District",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: getFormattedDate(1),
        dayNumber: 2,
        activities: [
            {
                id: generateId(),
                time: "11:00",
                duration: "2h",
                title: "Monorail de Liziba & Eling Testbed 2",
                chineseTitle: "李子坝轻轨 & 二厂文创公园",
                description: "Observation du monorail qui traverse l'immeuble puis balade dans le parc créatif avec vue sur les deux fleuves.",
                location: "Liziba, Yuzhong",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: getFormattedDate(2),
        dayNumber: 3,
        activities: []
    }
];
