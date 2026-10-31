"use client";

import { useState, useEffect } from "react";
import { CloudSun, Droplets, Wind, Loader2, CloudRain, Sun, Cloud, Snowflake, CloudLightning } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = [
    { name: "Chongqing", chinese: "重庆", lat: 29.5623, lng: 106.5774 },
    { name: "Chengdu", chinese: "成都", lat: 30.5728, lng: 104.0668 },
    { name: "Pékin", chinese: "北京", lat: 39.9042, lng: 116.4074 },
];

export function WeatherWidget() {
    const [selectedCity, setSelectedCity] = useState(CITIES[0]);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const fetchForecast = async () => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FShanghai`;
                const res = await fetch(url);
                const data = await res.json();
                if (isMounted && data) {
                    setWeather(data);
                }
            } catch (e) {
                console.error("Erreur météo", e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchForecast();
        return () => { isMounted = false; };
    }, [selectedCity]);

    const getWeatherInfo = (code: number) => {
        if (code === 0) return { label: "Ensoleillé", icon: <Sun className="w-5 h-5 text-amber-500" /> };
        if (code <= 3) return { label: "Éclaircies", icon: <CloudSun className="w-5 h-5 text-amber-500" /> };
        if (code === 45 || code === 48) return { label: "Brouillard", icon: <Cloud className="w-5 h-5 text-stone-400" /> };
        if (code >= 51 && code <= 67) return { label: "Pluie", icon: <CloudRain className="w-5 h-5 text-sky-500" /> };
        if (code >= 71 && code <= 77) return { label: "Neige", icon: <Snowflake className="w-5 h-5 text-sky-400" /> };
        if (code >= 95) return { label: "Orage", icon: <CloudLightning className="w-5 h-5 text-primary" /> };
        return { label: "Nuageux", icon: <Cloud className="w-5 h-5 text-stone-400" /> };
    };

    const currentCode = weather?.current?.weather_code ?? 0;
    const currentInfo = getWeatherInfo(currentCode);

    return (
        <div className="card-warm p-5 space-y-4">
            {/* Header & City Tabs */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Météo & Climat</span>
                    <h3 className="text-base font-black text-foreground">Prévisions Semaine</h3>
                </div>

                <div className="flex gap-1 p-1 bg-muted/60 rounded-xl">
                    {CITIES.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => setSelectedCity(c)}
                            className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all select-none",
                                selectedCity.name === c.name
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span className="text-xs">Chargement des prévisions...</span>
                </div>
            ) : weather ? (
                <div className="space-y-4">
                    {/* Current Weather Banner */}
                    <div className="p-4 rounded-2xl bg-[#FCFAF5] border border-border flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-foreground">{selectedCity.name}</h4>
                                <span className="hanzi text-xs font-bold text-primary">{selectedCity.chinese}</span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-4xl font-black text-foreground tracking-tight">
                                    {Math.round(weather.current.temperature_2m)}°
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground">
                                    Ressenti {Math.round(weather.current.apparent_temperature)}°
                                </span>
                            </div>
                            <span className="text-xs font-bold text-gold-dark mt-0.5 block">
                                {currentInfo.label}
                            </span>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="p-3 rounded-2xl bg-white border border-border shadow-sm">
                                {currentInfo.icon}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Droplets className="w-3 h-3 text-sky-500" />
                                <span>{weather.current.relative_humidity_2m}% humidité</span>
                            </div>
                        </div>
                    </div>

                    {/* 7-DAY FORECAST LIST */}
                    <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                            Prévisions sur 7 jours
                        </span>

                        <div className="divide-y divide-border/60 rounded-2xl bg-[#FCFAF5] border border-border px-3">
                            {weather.daily?.time?.map((dateStr: string, idx: number) => {
                                const d = new Date(dateStr);
                                const dayName = idx === 0 ? "Aujourd'hui" : d.toLocaleDateString("fr-FR", { weekday: "short" });
                                const code = weather.daily.weather_code[idx];
                                const dayInfo = getWeatherInfo(code);
                                const minT = Math.round(weather.daily.temperature_2m_min[idx]);
                                const maxT = Math.round(weather.daily.temperature_2m_max[idx]);
                                const rain = weather.daily.precipitation_probability_max[idx];

                                return (
                                    <div key={dateStr} className="py-2.5 flex items-center justify-between text-xs">
                                        <span className="w-24 font-bold text-foreground capitalize truncate">
                                            {dayName}
                                        </span>

                                        <div className="flex items-center gap-2 flex-1 justify-center">
                                            <div className="scale-90">{dayInfo.icon}</div>
                                            {rain > 20 && (
                                                <span className="text-[10px] font-semibold text-sky-600">
                                                    {rain}%
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-right">
                                            <span className="text-muted-foreground font-semibold w-7">{minT}°</span>
                                            <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden relative">
                                                <div
                                                    className="h-full bg-gradient-to-r from-amber-400 to-primary rounded-full"
                                                    style={{ width: `${Math.min(100, Math.max(20, (maxT - minT) * 12))}%` }}
                                                />
                                            </div>
                                            <span className="font-black text-foreground w-7">{maxT}°</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
