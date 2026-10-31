"use client";

import { useState, useEffect } from "react";
import { CloudSun, Droplets, Wind, MapPin, Loader2, CloudRain, Sun, Cloud, Snowflake, CloudLightning, X, Plus, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_CITIES = [
    { name: "Chongqing", chineseName: "重庆", lat: 29.5623, lng: 106.5774 },
    { name: "Chengdu", chineseName: "成都", lat: 30.5728, lng: 104.0668 },
    { name: "Pékin", chineseName: "北京", lat: 39.9042, lng: 116.4074 },
];

export function WeatherWidget() {
    const [cities, setCities] = useState(DEFAULT_CITIES);
    const [weatherData, setWeatherData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const results: Record<string, any> = {};
                await Promise.all(
                    cities.map(async (city) => {
                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
                        const res = await fetch(url);
                        const data = await res.json();
                        if (data?.current) {
                            results[city.name] = data.current;
                        }
                    })
                );
                setWeatherData(results);
            } catch (e) {
                console.error("Failed to load weather", e);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [cities]);

    const renderWeatherIcon = (code: number) => {
        if (code === 0) return <Sun className="w-5 h-5 text-amber-500" />;
        if (code <= 3) return <CloudSun className="w-5 h-5 text-amber-500" />;
        if (code === 45 || code === 48) return <Cloud className="w-5 h-5 text-muted-foreground" />;
        if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-sky-500" />;
        if (code >= 71 && code <= 77) return <Snowflake className="w-5 h-5 text-sky-400" />;
        if (code >= 95) return <CloudLightning className="w-5 h-5 text-primary" />;
        return <Cloud className="w-5 h-5 text-muted-foreground" />;
    };

    return (
        <div className="card-clean p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Climat & Météo</span>
                    <h3 className="text-base font-bold text-foreground">Conditions Actuelles</h3>
                </div>
                {loading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {cities.map((city) => {
                    const w = weatherData[city.name];

                    return (
                        <div
                            key={city.name}
                            className="p-3.5 rounded-xl bg-muted/30 border border-border flex flex-col justify-between space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-bold text-xs text-foreground">{city.name}</h4>
                                        <span className="hanzi text-[11px] font-semibold text-primary">{city.chineseName}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">Temps réel</span>
                                </div>
                                <div>
                                    {w ? renderWeatherIcon(w.weather_code) : <Cloud className="w-5 h-5 text-muted-foreground" />}
                                </div>
                            </div>

                            <div className="flex items-baseline justify-between pt-1">
                                <span className="text-2xl font-black text-foreground tracking-tight">
                                    {w ? `${Math.round(w.temperature_2m)}°` : "--"}
                                </span>
                                {w && (
                                    <div className="text-right">
                                        <span className="text-[10px] text-muted-foreground block">
                                            Ressenti {Math.round(w.apparent_temperature)}°
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end">
                                            <Droplets className="w-2.5 h-2.5 text-sky-500" />
                                            <span>{w.relative_humidity_2m}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
