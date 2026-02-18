"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GUIDE_DATA, CATEGORIES, GuidePlace, CategoryId } from "@/data/guideData";
import { MapPin, Star, Plus, Check, Info, Navigation, ArrowLeft, Lightbulb, Clock, Utensils, Coffee, Landmark, ShoppingBag, Martini, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgenda } from "@/hooks/useAgenda";

export function BestOfGuide() {
    const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<GuidePlace | null>(null);
    const [now, setNow] = useState<Date | null>(null);
    const { addActivity, unscheduled, days } = useAgenda();

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 60000); // UI update every min
        return () => clearInterval(timer);
    }, []);

    // Filter data
    const places = activeCategory ? GUIDE_DATA.filter(p => p.category === activeCategory).sort((a, b) => b.averageRating - a.averageRating) : [];
    const currentCategory = activeCategory ? CATEGORIES.find(c => c.id === activeCategory) : null;

    // Helpers to check if added
    const isAdded = (id: string) => {
        const inUnscheduled = unscheduled.some(u => u.title.includes(id) || u.description?.includes(id));
        const inDays = days.some(d => d.activities.some(a => a.title.includes(id) || a.description?.includes(id)));
        return inUnscheduled || inDays;
    };

    // Helper: Check if Open
    const getOpenStatus = (open: string, close: string) => {
        if (!now) return { isOpen: false, text: "Wait..." };

        const [openH, openM] = open.split(":").map(Number);
        const [closeH, closeM] = close.split(":").map(Number);

        const currentH = now.getHours();
        const currentM = now.getMinutes();
        const currentTime = currentH * 60 + currentM;
        const openTime = openH * 60 + openM;
        let closeTime = closeH * 60 + closeM;

        if (closeTime <= openTime) closeTime += 24 * 60; // Handle over midnight (e.g. 02:00)

        // Adjust current time if it's early morning and we're checking a late night place
        let adjustedCurrentTime = currentTime;
        if (currentH < 5) adjustedCurrentTime += 24 * 60;

        const isOpen = adjustedCurrentTime >= openTime && adjustedCurrentTime < closeTime;

        return {
            isOpen,
            text: isOpen ? "Ouvert" : "Fermé",
            color: isOpen ? "text-emerald-600" : "text-red-500",
            hours: `${open} - ${close}`
        };
    };

    const handleAdd = (place: GuidePlace, e: React.MouseEvent) => {
        e.stopPropagation();
        addActivity("unscheduled", {
            time: "10:00",
            title: place.title,
            description: `${place.chineseTitle} (${place.pinyin}) - ${place.description.substring(0, 50)}... [ID:${place.id}]`,
            location: place.district,
            address: place.address,
            image: place.image
        });
    };

    // Icon Mapping
    const getIcon = (name: string) => {
        switch (name) {
            case "Utensils": return <Utensils className="w-6 h-6" />;
            case "Coffee": return <Coffee className="w-6 h-6" />;
            case "Landmark": return <Landmark className="w-6 h-6" />;
            case "ShoppingBag": return <ShoppingBag className="w-6 h-6" />;
            case "Martini": return <Martini className="w-6 h-6" />;
            default: return <Utensils className="w-6 h-6" />;
        }
    };

    // Helper for Rating Bubbles
    const RatingBubbles = ({ score, colorClass }: { score: number, colorClass: string }) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full border border-slate-200 dark:border-slate-700",
                            i <= Math.round(score) ? colorClass : "bg-transparent"
                        )}
                    />
                ))}
            </div>
        );
    };

    // --- VIEW: CATEGORY SELECTION (DASHBOARD) ---
    if (!activeCategory) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
                <div className="p-6 pb-4">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-1">
                        Le Guide <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600">Best Of</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Le Top 50 de Chongqing.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 pt-0">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4"> {/* Responsive grid */}
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className="group flex flex-col items-center gap-1.5"
                            >
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all active:scale-[0.95] border border-slate-100 dark:border-slate-800">
                                    <Image
                                        src={cat.image}
                                        alt={cat.label}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                    {/* Icon centered in image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm">
                                            {getIcon(cat.iconName)}
                                        </div>
                                    </div>
                                </div>

                                {/* Text below image */}
                                <div className="text-center w-full">
                                    <h3 className="text-slate-800 dark:text-white font-bold text-xs leading-tight truncate px-1">{cat.label}</h3>
                                    <p className="text-slate-400 text-[10px] leading-tight line-clamp-1 px-0.5 mt-0.5">{cat.description.split(" ")[0]}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: LIST FOR CATEGORY ---
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col min-h-[600px] h-[75vh]">

            {/* Header */}
            <div className="p-0 bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 p-4">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                            {currentCategory?.label}
                        </h2>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950/20 w-full touch-pan-y overscroll-contain">
                <div className="flex flex-col w-full max-w-full">
                    {places.map((place, index) => {
                        const status = getOpenStatus(place.openTime, place.closeTime);

                        return (
                            <div
                                key={place.id}
                                onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                    setSelectedPlace(place);
                                }}
                                className="bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                            >
                                {/* LEFT: Image + Rank */}
                                <div className="relative w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                    <Image
                                        src={place.image}
                                        alt={place.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-0 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 shadow-sm">
                                        #{index + 1}
                                    </div>
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                                        <Heart className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* RIGHT: Content */}
                                <div className="flex-1 flex flex-col min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight truncate pr-2">
                                            {place.title}
                                        </h3>
                                        <button
                                            onClick={(e) => handleAdd(place, e)}
                                            disabled={isAdded(place.id)}
                                            className={cn(
                                                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                                isAdded(place.id)
                                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                    : "bg-amber-500 text-white hover:bg-amber-600 hover:scale-110 shadow-md shadow-amber-200"
                                            )}
                                            title={isAdded(place.id) ? "Déjà ajouté" : "Ajouter au planning"}
                                        >
                                            {isAdded(place.id) ? <Check className="w-4 h-4" /> : <Plus className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Ratings Row */}
                                    <div className="flex items-center gap-3 mt-1 mb-2">
                                        <div className="flex items-center gap-1.5" title="Our Rating">
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">{place.averageRating}</span>
                                            <RatingBubbles score={place.averageRating} colorClass="bg-amber-400 border-amber-400" />
                                            <span className="text-[10px] text-slate-400">({place.ratings.find(r => r.source === "Chongqing Companion")?.count || "62 avis"})</span>
                                        </div>
                                    </div>

                                    {/* Meta Row: Cuisine • Price • Status */}
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">
                                            {place.tags[0]}
                                        </span>
                                        {place.priceLevel && (
                                            <>
                                                <span>•</span>
                                                <span>{place.priceLevel}</span>
                                            </>
                                        )}
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-slate-400" />
                                            <span className={cn("font-medium", status.color)}>
                                                {status.hours}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Snippet / Tip */}
                                    <div className="mt-auto relative pl-3 border-l-2 border-slate-200 dark:border-slate-700 py-0.5">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                                            "{place.tips}"
                                        </p>
                                    </div>

                                    {/* Sources Ratings (Small) */}
                                    <div className="flex gap-2 mt-3 pt-2 border-t border-slate-50 dark:border-slate-800">
                                        {place.ratings.filter(r => r.source !== "Chongqing Companion").map((rating, idx) => (
                                            <div key={idx} className="flex items-center gap-1">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", rating.source === "TripAdvisor" ? "bg-emerald-500" : rating.source === "Dianping" ? "bg-orange-500" : "bg-blue-500")} />
                                                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">{rating.source}</span>
                                                <span className={cn("text-[9px] font-bold", rating.source === "TripAdvisor" ? "text-emerald-600" : rating.source === "Dianping" ? "text-orange-600" : "text-blue-600")}>{rating.score}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Details Modal - Kept relatively similar but cleaner */}
            {selectedPlace && (
                <div className="absolute inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm p-0 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
                    <div ref={(node) => { if (node) node.scrollIntoView({ behavior: "instant", block: "start" }); }} /* Scroll fix */ />
                    <div className="relative h-64 w-full shrink-0">
                        <Image
                            src={selectedPlace.image}
                            alt={selectedPlace.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <button
                            onClick={() => setSelectedPlace(null)}
                            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 text-white transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-3xl font-black text-white mb-1 shadow-black/50 text-shadow-sm">{selectedPlace.title}</h1>
                            <p className="text-white/80 font-medium">{selectedPlace.chineseTitle}</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {/* All Ratings Detailed */}
                        <div className="grid grid-cols-3 gap-2">
                            {selectedPlace.ratings.map((rating, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold mb-1">{rating.source}</span>
                                    <span className={cn(
                                        "text-xl font-black",
                                        rating.source === "TripAdvisor" ? "text-emerald-500" :
                                            rating.source === "Dianping" ? "text-orange-500" :
                                                "text-amber-500"
                                    )}>{rating.score}</span>
                                    <div className="flex gap-0.5 mt-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={cn("w-1 h-1 rounded-full", i <= Math.round(rating.score) ? (rating.source === "TripAdvisor" ? "bg-emerald-500" : rating.source === "Dianping" ? "bg-orange-500" : "bg-amber-500") : "bg-slate-200")} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-500" />
                                Le Tips
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                {selectedPlace.tips}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-900">À propos</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {selectedPlace.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mt-8">
                            <button
                                onClick={(e) => handleAdd(selectedPlace, e)}
                                className={cn(
                                    "flex-1 h-12 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-sm uppercase tracking-wider",
                                    isAdded(selectedPlace.id)
                                        ? "bg-slate-100 text-slate-400"
                                        : "bg-amber-500 text-white shadow-lg shadow-amber-200 hover:bg-amber-600"
                                )}
                            >
                                {isAdded(selectedPlace.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isAdded(selectedPlace.id) ? "Ajouté à l'agenda" : "Ajouter à l'agenda"}
                            </button>

                            <div className="flex gap-2">
                                <a
                                    href={`https://www.tripadvisor.fr/Search?q=${encodeURIComponent(selectedPlace.title + " Chongqing")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                                    title="Voir sur TripAdvisor"
                                >
                                    <div className="w-6 h-6 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                                        <span className="font-bold text-[10px] leading-none">TA</span>
                                    </div>
                                </a>

                                <a
                                    href={`https://www.amap.com/search?query=${encodeURIComponent(selectedPlace.chineseTitle || selectedPlace.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                                    title="Voir sur Amap (Maps)"
                                >
                                    <Navigation className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
