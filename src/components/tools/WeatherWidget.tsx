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
    const [selectedCityName, setSelectedCityName] = useState<string | null>(null);

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
        let isMounted = true;
        const fetchAllWeather = async () => {
            for (const city of cities) {
                try {
                    const res = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
                    );
                    const data = await res.json();

                    if (isMounted) {
                        setWeatherData(prev => ({
                            ...prev,
                            [city.name]: {
                                ...data.current,
                                daily: data.daily
                            }
                        }));
                    }
                } catch (e) {
                    console.error("Failed to fetch weather for " + city.name);
                }
            }
        };
        fetchAllWeather();
        return () => { isMounted = false };
    }, [cities]); // removed weatherData from dependency to fix infinite loop

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

    const getWeatherIcon = (code: number, isModal = false) => {
        const emojiSize = isModal ? "text-2xl" : "text-6xl";
        let emoji = "☁️";
        if (code === 0) emoji = "☀️";
        else if (code === 1 || code === 2) emoji = "🌤️";
        else if (code === 3) emoji = "☁️";
        else if (code === 45 || code === 48) emoji = "🌫️";
        else if (code >= 51 && code <= 57) emoji = "🌦️";
        else if (code >= 61 && code <= 67) emoji = "🌧️";
        else if (code >= 71 && code <= 77) emoji = "❄️";
        else if (code >= 80 && code <= 82) emoji = "🌧️";
        else if (code >= 85 && code <= 86) emoji = "🌨️";
        else if (code >= 95 && code <= 99) emoji = "⛈️";

        return <div className={cn(emojiSize, "drop-shadow-md leading-none flex items-center justify-center filter")}>{emoji}</div>;
    };

    return (
        <div className="w-full relative min-h-[160px]">
            {!showSearch && (
                <div className="grid grid-cols-2 gap-3 pb-2 px-1">
                    {cities.map((city, idx) => {
                        const w = weatherData[city.name];
                        return (
                            <div
                                key={city.name}
                                onClick={() => setSelectedCityName(city.name)}
                                className={cn(
                                    "relative w-full aspect-[4/5] rounded-[2rem] p-4 text-white shadow-lg flex flex-col justify-between transition-transform active:scale-95 overflow-hidden border border-white/20 cursor-pointer transform-gpu",
                                    idx % 2 === 0 ? "bg-gradient-to-br from-blue-500/90 to-indigo-600/90" : "bg-gradient-to-br from-indigo-500/90 to-purple-600/90"
                                )}
                            >
                                {/* Decorative Circles */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -mr-8 -mt-8" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/20 rounded-full blur-2xl -ml-8 -mb-8" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-black text-sm leading-tight truncate max-w-[80px] drop-shadow-sm">{city.name}</h4>
                                        <p className="text-[10px] uppercase font-bold opacity-80 mt-0.5">Météo</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeCity(city.name);
                                        }}
                                        className="text-white/60 hover:text-white transition-colors bg-black/10 rounded-full p-1"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-5xl font-black tracking-tighter drop-shadow-md">
                                            {w ? Math.round(w.temperature_2m) + "°" : "--"}
                                        </span>
                                        <div className="filter drop-shadow-lg scale-110 origin-bottom-right">
                                            {w && getWeatherIcon(w.weather_code)}
                                        </div>
                                    </div>

                                    {/* Additional weather details */}
                                    <div className="flex flex-wrap items-center gap-1.5 mt-2 opacity-90 text-[10px]">
                                        <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 shadow-sm backdrop-blur-sm">
                                            <span className="font-bold">Ressenti:</span>
                                            {w ? Math.round(w.apparent_temperature) + "°C" : "--"}
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 shadow-sm backdrop-blur-sm">
                                            <Droplets className="w-3 h-3 text-blue-200" />
                                            {w ? w.relative_humidity_2m + "%" : "--"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Button */}
                    <button
                        onClick={() => setShowSearch(true)}
                        className="w-full aspect-[4/5] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 gap-3 hover:bg-slate-50 hover:text-indigo-400 hover:border-indigo-200 transition-all group"
                    >
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Ajouter</span>
                    </button>
                </div >
            )}

            {/* Search Overlay - Fixed to avoid clipping */}
            {
                showSearch && (
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
                )
            }

            {/* Detailed Forecast Modal */}
            {
                selectedCityName && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200" onClick={() => setSelectedCityName(null)}>
                        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl border border-slate-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setSelectedCityName(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 pr-8">{selectedCityName} <br /><span className="text-sm font-bold text-amber-500 uppercase tracking-widest">Prévisions 7 Jours</span></h3>

                            <div className="space-y-3">
                                {weatherData[selectedCityName]?.daily ? (
                                    weatherData[selectedCityName].daily.time.slice(0, 7).map((dateStr: string, i: number) => {
                                        const date = new Date(dateStr);
                                        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
                                        const min = Math.round(weatherData[selectedCityName].daily.temperature_2m_min[i]);
                                        const max = Math.round(weatherData[selectedCityName].daily.temperature_2m_max[i]);
                                        const code = weatherData[selectedCityName].daily.weather_code[i];

                                        return (
                                            <div key={dateStr} className="flex flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                                <div className="flex items-center gap-3 w-12">
                                                    <span className="font-bold text-slate-600 dark:text-slate-300 capitalize">{dayName}</span>
                                                </div>
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                                        <div className="scale-[1]">{getWeatherIcon(code, true)}</div>
                                                    </div>
                                                    <div className="flex-1 flex items-center justify-end gap-3 text-sm font-bold">
                                                        <span className="text-slate-400">{min}°</span>
                                                        <div className="flex-1 max-w-[60px] h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-amber-500 opacity-80" />
                                                        <span className="text-slate-800 dark:text-white">{max}°</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-slate-400 text-sm py-4">Données indisponibles</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
