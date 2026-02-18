"use client";

import { useState, useEffect } from "react";
import { CloudSun, Droplets, Wind, MapPin, Loader2, CloudRain, Sun, Cloud, Snowflake, CloudLightning, X, Plus, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = [
    { name: "Chongqing", lat: 29.5623, lng: 106.5774 },
    { name: "Beijing", lat: 39.9042, lng: 116.4074 },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
];

export function WeatherWidget() {
    const [cities, setCities] = useState<{ name: string, lat: number, lng: number }[]>([
        { name: "Chongqing", lat: 29.5623, lng: 106.5774 }
    ]);
    const [weatherData, setWeatherData] = useState<Record<string, any>>({});
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // Load saved cities on mount
    useEffect(() => {
        const saved = localStorage.getItem("weather_cities");
        if (saved) {
            try {
                setCities(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved cities", e);
            }
        }
    }, []);

    // Save cities on change
    useEffect(() => {
        localStorage.setItem("weather_cities", JSON.stringify(cities));
    }, [cities]);

    useEffect(() => {
        const fetchAllWeather = async () => {
            const newWeatherData: Record<string, any> = {};

            for (const city of cities) {
                if (weatherData[city.name]) {
                    newWeatherData[city.name] = weatherData[city.name];
                    continue;
                }
                try {
                    const res = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weather_code`
                    );
                    const data = await res.json();
                    newWeatherData[city.name] = data.current;
                } catch (e) {
                    console.error("Failed to fetch weather for " + city.name);
                }
            }
            setWeatherData(prev => ({ ...prev, ...newWeatherData }));
        };
        fetchAllWeather();
    }, [cities]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const addCity = (city: any) => {
        if (!cities.find(c => c.name === city.name)) {
            setCities([...cities, { name: city.name, lat: city.latitude, lng: city.longitude }]);
        }
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const removeCity = (name: string) => {
        setCities(cities.filter(c => c.name !== name));
    };

    const getWeatherIcon = (code: number) => {
        const iconClass = "w-8 h-8 text-white drop-shadow-md";
        if (code <= 1) return <Sun className={iconClass} />;
        if (code <= 3) return <CloudSun className={iconClass} />;
        if (code <= 48) return <Cloud className={iconClass} />;
        if (code <= 67) return <CloudRain className={iconClass} />;
        return <CloudSun className={iconClass} />;
    };

    return (
        <div className="w-full relative min-h-[160px]">
            {/* Horizontal Scroll Cities */}
            {!showSearch && (
                <div className="flex gap-3 overflow-x-auto pb-6 pt-2 px-1 snap-x no-scrollbar">
                    {cities.map((city, idx) => {
                        const w = weatherData[city.name];
                        return (
                            <div
                                key={city.name}
                                className={cn(
                                    "relative shrink-0 w-36 aspect-[4/5] rounded-[2rem] p-5 text-white shadow-neon flex flex-col justify-between snap-start transition-transform active:scale-95 overflow-hidden",
                                    idx % 2 === 0 ? "bg-gradient-to-br from-blue-400 to-indigo-500" : "bg-gradient-to-br from-indigo-400 to-purple-500"
                                )}
                            >
                                {/* Decorative Circles */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-6 -mt-6" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full blur-xl -ml-6 -mb-6" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-black text-sm leading-tight truncate max-w-[80px]">{city.name}</h4>
                                        <p className="text-[10px] uppercase font-bold opacity-60 mt-0.5">Météo</p>
                                    </div>
                                    <button
                                        onClick={() => removeCity(city.name)}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-4xl font-black tracking-tighter">
                                            {w ? Math.round(w.temperature_2m) + "°" : "--"}
                                        </span>
                                        {w && getWeatherIcon(w.weather_code)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Button */}
                    <button
                        onClick={() => setShowSearch(true)}
                        className="shrink-0 w-36 aspect-[4/5] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 gap-3 hover:bg-slate-50 hover:text-indigo-400 hover:border-indigo-200 transition-all group"
                    >
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Ajouter</span>
                    </button>
                </div>
            )}

            {/* Search Overlay - Fixed to avoid clipping */}
            {showSearch && (
                <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm p-6 animate-in zoom-in-95 fade-in duration-200 flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <button onClick={() => setShowSearch(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                                <ArrowLeft className="w-4 h-4 text-slate-500" />
                            </button>
                            <span className="font-bold text-slate-700">Nouvelle ville</span>
                        </div>

                        <div className="relative mb-4 shrink-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                                type="text"
                                autoFocus
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 -mr-2 pr-2 custom-scrollbar">
                            {searchResults.length === 0 && searchQuery.length > 2 && (
                                <p className="text-center text-xs text-slate-400 py-4 opacity-50">Aucun résultat trouvé</p>
                            )}
                            {searchResults.map(res => (
                                <button
                                    key={res.id}
                                    onClick={() => addCity(res)}
                                    className="w-full text-left p-3 rounded-xl hover:bg-indigo-50 transition-colors flex justify-between items-center group"
                                >
                                    <span className="font-bold text-sm text-slate-700 group-hover:text-indigo-700">{res.name}</span>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase bg-slate-50 px-2 py-1 rounded-md">{res.country_code}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => setShowSearch(false)} className="mt-8 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 backdrop-blur-md">Fermer</button>
                </div>
            )}
        </div>
    );
}
