"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, X, Sun, Moon, Sunset } from "lucide-react";
import { toZonedTime, format } from "date-fns-tz";
import { cn } from "@/lib/utils";

export function WorldClock() {
    const [now, setNow] = useState(new Date());
    const [selectedZones, setSelectedZones] = useState<{ label: string; zone: string; tag: string }[]>([
        { label: "Chongqing", zone: "Asia/Shanghai", tag: "Chine (UTC+8)" },
        { label: "Paris", zone: "Europe/Paris", tag: "France (UTC+1/2)" }
    ]);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

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
        if (!city.timezone) return;
        const newZone = {
            label: city.name,
            zone: city.timezone,
            tag: `${city.country_code?.toUpperCase() || ""} (${city.timezone})`
        };

        if (!selectedZones.find(z => z.label === newZone.label)) {
            setSelectedZones([...selectedZones, newZone]);
        }
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const removeZone = (label: string) => {
        if (selectedZones.length <= 1) return;
        setSelectedZones(selectedZones.filter(z => z.label !== label));
    };

    return (
        <div className="card-clean p-5 space-y-4 relative">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Fuseaux Horaires</span>
                    <h3 className="text-base font-bold text-foreground">Horloge Monde</h3>
                </div>
                <button
                    onClick={() => setShowSearch(true)}
                    className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Ajouter une ville"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Search dropdown */}
            {showSearch && (
                <div className="absolute top-16 left-4 right-4 bg-card rounded-xl shadow-lg border border-border p-3 z-20 space-y-2">
                    <div className="flex items-center gap-2">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Rechercher une ville (ex: Tokyo, Pékin...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary"
                        />
                        <button onClick={() => setShowSearch(false)} className="text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="max-h-40 overflow-y-auto space-y-1">
                        {searchResults.map(res => (
                            <button
                                key={res.id}
                                onClick={() => addZone(res)}
                                className="w-full text-left px-2.5 py-1.5 text-xs rounded-md hover:bg-muted text-foreground flex justify-between"
                            >
                                <span>{res.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">{res.country_code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-2">
                {selectedZones.map((city) => {
                    const timeInZone = toZonedTime(now, city.zone);
                    const hours = parseInt(format(timeInZone, "H", { timeZone: city.zone }));
                    const isNight = hours < 6 || hours >= 22;

                    return (
                        <div
                            key={city.label}
                            className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between"
                        >
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                    {isNight ? (
                                        <Moon className="w-3.5 h-3.5 text-muted-foreground" />
                                    ) : (
                                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                                    )}
                                    <span className="font-semibold text-xs text-foreground">{city.label}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">{city.tag}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-lg font-black text-foreground tracking-tight">
                                    {format(timeInZone, "HH:mm", { timeZone: city.zone })}
                                </span>
                                {selectedZones.length > 2 && (
                                    <button
                                        onClick={() => removeZone(city.label)}
                                        className="text-muted-foreground hover:text-destructive p-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
