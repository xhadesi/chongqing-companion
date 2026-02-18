"use client";

import { useState } from "react";
import { Copy, Check, MapPin, Phone, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxiDestination {
    id: string;
    title: string;
    chineseTitle: string;
    pinyin: string;
    address: string;
    category: "airport" | "landmark" | "hotel" | "station";
}

const DESTINATIONS: TaxiDestination[] = [
    {
        id: "airport-cgo",
        title: "Aéroport Chongqing Jiangbei (T3)",
        chineseTitle: "重庆江北国际机场 - T3航站楼",
        pinyin: "Chóngqìng Jiāngběi Guójì Jīchǎng - T3 Hángzhànlóu",
        address: "Jiangbei District, Chongqing",
        category: "airport"
    },
    {
        id: "station-north",
        title: "Gare du Nord (Chongqing Bei)",
        chineseTitle: "重庆北站",
        pinyin: "Chóngqìng Běizhàn",
        address: "Yubei District, Chongqing",
        category: "station"
    },
    {
        id: "hongya",
        title: "Grotte de Hongya",
        chineseTitle: "洪崖洞",
        pinyin: "Hóngyádòng",
        address: "Binjiang Road, Yuzhong District",
        category: "landmark"
    },
    {
        id: "jiefangbei",
        title: "Jiefangbei (Centre Ville)",
        chineseTitle: "解放碑",
        pinyin: "Jiěfàngbēi",
        address: "Minquan Road, Yuzhong District",
        category: "landmark"
    },
    {
        id: "raffles",
        title: "Raffles City (Chaotianmen)",
        chineseTitle: "来福士广场 (朝天门)",
        pinyin: "Láifúshì Guǎngchǎng (Cháotiānmén)",
        address: "Chaotianmen, Yuzhong District",
        category: "landmark"
    }
];

export function TaxiCards() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Car className="w-32 h-32 rotate-12" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2">Taxi Cards</h2>
                    <p className="text-blue-100 font-medium leading-relaxed">
                        Montrez ces cartes au chauffeur pour arriver à destination sans stress.
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {DESTINATIONS.map((dest) => (
                    <div
                        key={dest.id}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    dest.category === "airport" ? "bg-amber-100 text-amber-600" :
                                        dest.category === "station" ? "bg-blue-100 text-blue-600" :
                                            "bg-purple-100 text-purple-600"
                                )}>
                                    {dest.category === "airport" ? <Phone className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{dest.title}</h3>
                            </div>
                            <button
                                onClick={() => handleCopy(dest.chineseTitle, dest.id)}
                                className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {copiedId === dest.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-slate-400" />}
                            </button>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center mb-4">
                            <p className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                                {dest.chineseTitle}
                            </p>
                            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                                {dest.pinyin}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{dest.address}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
