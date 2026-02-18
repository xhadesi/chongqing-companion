export interface Activity {
    id: string;
    time: string; // HH:MM
    title: string;
    description?: string;
    icon?: string; // Lucide icon name or emoji
    location?: string;
    address?: string; // For navigation
    completed: boolean;
    image?: string;
}

export interface TripDay {
    id: string;
    date: string; // YYYY-MM-DD
    dayNumber: number; // Day 1, Day 2...
    activities: Activity[];
}

export interface Location {
    id: string;
    lat: number;
    lng: number;
    name: string;
    chineseName: string;
    type: string;
    description?: string;
}
