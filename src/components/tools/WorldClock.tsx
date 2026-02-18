"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, X } from "lucide-react";
import { toZonedTime, format } from 'date-fns-tz';

const ALL_ZONES = [
    { label: "📍 Ma Position", zone: Intl.DateTimeFormat().resolvedOptions().timeZone }, // Local
    { label: "🇨🇳 Chongqing", zone: "Asia/Shanghai" },
    { label: "🇫🇷 Paris", zone: "Europe/Paris" },
    { label: "🇺🇸 New York", zone: "America/New_York" },
    { label: "🇬🇧 Londres", zone: "Europe/London" },
    { label: "🇯🇵 Tokyo", zone: "Asia/Tokyo" },
    { label: "🇦🇺 Sydney", zone: "Australia/Sydney" },
];

export function WorldClock() {
    const [now, setNow] = useState(new Date());
    const [selectedZones, setSelectedZones] = useState([ALL_ZONES[1], ALL_ZONES[2]]); // Default Chongqing & Paris

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const addZone = (zone: any) => {
        if (!selectedZones.find(z => z.label === zone.label)) {
            setSelectedZones([...selectedZones, zone]);
        }
    };

    const removeZone = (label: string) => {
        setSelectedZones(selectedZones.filter(z => z.label !== label));
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-xl">
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">Horloge Monde</h3>
                        <p className="text-xs text-slate-500">Pour ne pas appeler à 3h du mat'</p>
                    </div>
                </div>

                {/* Add City Trigger - Simple Select for now */}
                <div className="relative group">
                    <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 hidden group-hover:block z-20">
                        <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2">Ajouter une ville</p>
                        {ALL_ZONES.map(z => (
                            <button
                                key={z.label}
                                onClick={() => addZone(z)}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                {z.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {selectedZones.map((city) => {
                    const timeInZone = toZonedTime(now, city.zone);
                    const hours = parseInt(format(timeInZone, 'H', { timeZone: city.zone }));
                    const isNight = hours < 6 || hours > 20;

                    return (
                        <div key={city.label} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isNight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-blue-50 border-blue-100 text-slate-900'}`}>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold opacity-90">{city.label}</span>
                                    {isNight && <MoonIcon className="w-3 h-3 text-indigo-400" />}
                                </div>
                                <p className="text-xs opacity-60 mt-0.5">
                                    {format(timeInZone, 'EEEE d MMM', { timeZone: city.zone })}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-mono font-bold tracking-tight">
                                    {format(timeInZone, 'HH:mm', { timeZone: city.zone })}
                                </span>
                                <button onClick={() => removeZone(city.label)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded-full transition-all text-current">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
    )
}
