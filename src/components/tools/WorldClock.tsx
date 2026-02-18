"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, X, Sun, Moon, Sunset } from "lucide-react";
import { toZonedTime, format } from 'date-fns-tz';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function WorldClock() {
    const [now, setNow] = useState(new Date());
    const [selectedZones, setSelectedZones] = useState<{ label: string, zone: string }[]>([
        { label: "📍 Ma Position", zone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        { label: "🇨🇳 Chongqing", zone: "Asia/Shanghai" },
        { label: "🇫🇷 Paris", zone: "Europe/Paris" }
    ]);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Load saved zones
    useEffect(() => {
        const saved = localStorage.getItem("world_clock_zones");
        if (saved) {
            try {
                setSelectedZones(JSON.parse(saved));
            } catch (e) { console.error(e); }
        }
    }, []);

    // Save zones
    useEffect(() => {
        localStorage.setItem("world_clock_zones", JSON.stringify(selectedZones));
    }, [selectedZones]);

    // Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length < 3) {
                setSearchResults([]);
                return;
            }
            try {
                const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=fr&format=json`);
                const data = await res.json();
                if (data.results) setSearchResults(data.results);
            } catch (e) {
                console.error(e);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const addZone = (city: any) => {
        // Map timezone from lat/long if not provided, but OpenMeteo geocoding gives timezone directly often or we default.
        // Actually OpenMeteo Geocoding result has .timezone field!
        if (!city.timezone) return;

        const newZone = { label: `${city.country_code?.toUpperCase() === 'CN' ? '🇨🇳' : city.country_code?.toUpperCase() === 'FR' ? '🇫🇷' : '🌍'} ${city.name}`, zone: city.timezone };

        if (!selectedZones.find(z => z.label === newZone.label)) {
            setSelectedZones([...selectedZones, newZone]);
        }
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const removeZone = (label: string) => {
        setSelectedZones(selectedZones.filter(z => z.label !== label));
    };

    return (
        <Card variant="premium" className="p-6">
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

                {/* Add City Trigger */}
                <button
                    onClick={() => setShowSearch(true)}
                    className="p-2 bg-white/50 dark:bg-black/20 rounded-full hover:bg-white/80 dark:hover:bg-slate-700 transition-colors backdrop-blur-sm shadow-sm"
                >
                    <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>

                {/* Search Overlay */}
                {showSearch && (
                    <div className="absolute top-16 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 dark:border-slate-700 p-4 z-20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Rechercher une ville..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button onClick={() => setShowSearch(false)}><X className="w-4 h-4 text-slate-400" /></button>
                        </div>

                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {searchResults.map(res => (
                                <button
                                    key={res.id}
                                    onClick={() => addZone(res)}
                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex justify-between"
                                >
                                    <span>{res.name}</span>
                                    <span className="text-xs text-slate-400 uppercase">{res.country_code}</span>
                                </button>
                            ))}
                            {searchQuery.length > 2 && searchResults.length === 0 && (
                                <p className="text-xs text-slate-400 text-center py-2">Aucun résultat</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                {selectedZones.map((city) => {
                    const timeInZone = toZonedTime(now, city.zone);
                    const hours = parseInt(format(timeInZone, 'H', { timeZone: city.zone }));

                    // Theme Logic - Refined for Premium
                    let themeClass = "bg-blue-50/50 border-blue-100 text-slate-900";
                    let icon = <Sun className="w-4 h-4 text-orange-500" />;
                    let label = "Journée";

                    // Night
                    if (hours >= 21 || hours < 6) {
                        themeClass = "bg-slate-900/80 border-slate-800 text-white";
                        icon = <Moon className="w-4 h-4 text-indigo-300" />;
                        label = "Nuit";
                    }
                    // Evening
                    else if (hours >= 18 && hours < 21) {
                        themeClass = "bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-indigo-800 text-white";
                        icon = <Sunset className="w-4 h-4 text-amber-400" />;
                        label = "Soirée";
                    }

                    return (
                        <div key={city.label} className={cn("flex items-center justify-between p-4 rounded-2xl border transition-all relative group backdrop-blur-sm", themeClass)}>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold opacity-90">{city.label}</span>
                                    {icon}
                                </div>
                                <p className="text-xs opacity-60 mt-0.5">
                                    {format(timeInZone, 'EEEE d MMM', { timeZone: city.zone })} • {label}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-mono font-bold tracking-tight">
                                    {format(timeInZone, 'HH:mm', { timeZone: city.zone })}
                                </span>
                                <button
                                    onClick={() => removeZone(city.label)}
                                    className="p-2 bg-black/10 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                                    title="Supprimer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    );
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
    )
}
