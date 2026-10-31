"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GUIDE_DATA, CATEGORIES, GuidePlace, CategoryId } from "@/data/guideData";
import { MapPin, Plus, Check, Navigation, ArrowLeft, Lightbulb, Clock, Copy, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgenda } from "@/hooks/useAgenda";
import { ImageSlider } from "@/components/ui/ImageSlider";

export function BestOfGuide() {
    const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<GuidePlace | null>(null);
    const [now, setNow] = useState<Date | null>(null);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const { addActivity, unscheduled, days } = useAgenda();

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const places = activeCategory ? GUIDE_DATA.filter(p => p.category === activeCategory).sort((a, b) => b.averageRating - a.averageRating) : [];
    const currentCategory = activeCategory ? CATEGORIES.find(c => c.id === activeCategory) : null;

    const isAdded = (id: string) => {
        const inUnscheduled = unscheduled.some(u => u.title.includes(id) || u.description?.includes(id));
        const inDays = days.some(d => d.activities.some(a => a.title.includes(id) || a.description?.includes(id)));
        return inUnscheduled || inDays;
    };

    const getOpenStatus = (open: string, close: string) => {
        if (!now) return { isOpen: false, text: "Horaire non vérifié" };

        const [openH, openM] = open.split(":").map(Number);
        const [closeH, closeM] = close.split(":").map(Number);

        const currentH = now.getHours();
        const currentM = now.getMinutes();
        const currentTime = currentH * 60 + currentM;
        const openTime = openH * 60 + openM;
        let closeTime = closeH * 60 + closeM;

        if (closeTime <= openTime) closeTime += 24 * 60;
        let adjustedCurrentTime = currentTime;
        if (currentH < 5) adjustedCurrentTime += 24 * 60;

        const isOpen = adjustedCurrentTime >= openTime && adjustedCurrentTime < closeTime;

        return {
            isOpen,
            text: isOpen ? "Ouvert" : "Fermé",
            color: isOpen ? "text-emerald-600" : "text-primary",
            hours: `${open} - ${close}`
        };
    };

    const handleAdd = (place: GuidePlace, e: React.MouseEvent) => {
        e.stopPropagation();
        addActivity("unscheduled", {
            time: "10:00",
            title: place.title,
            chineseTitle: place.chineseTitle,
            description: `${place.chineseTitle} (${place.pinyin}) • ${place.description.substring(0, 70)}... [ID:${place.id}]`,
            location: place.district,
            address: place.address,
            images: place.images
        });
    };

    const copyForDidi = (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            const el = document.createElement("textarea");
            el.value = text;
            el.style.position = "fixed";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
    };

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    // --- VUE 1 : GRILLE DES CATÉGORIES ---
    if (!activeCategory) {
        return (
            <div className="card-warm p-5 space-y-4">
                <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Guide Interactif
                    </span>
                    <h2 className="text-xl font-black text-foreground tracking-tight">
                        Lieux & Saveurs de Chongqing
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Touchez une catégorie pour explorer les meilleurs spots, avis et photos.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className="card-warm overflow-hidden text-left hover:border-primary/60 transition-transform active:scale-95 group flex flex-col"
                        >
                            <div className="relative aspect-[4/3] w-full bg-stone-200">
                                <Image
                                    src={cat.images[0]}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2 text-white">
                                    <h3 className="font-bold text-xs leading-tight drop-shadow">{cat.label}</h3>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // --- VUE 2 : LISTE DES LIEUX DE LA CATÉGORIE ---
    return (
        <div className="card-warm overflow-hidden flex flex-col space-y-0">
            {/* Header Catégorie */}
            <div className="p-4 bg-white border-b border-border flex items-center gap-3 sticky top-0 z-20">
                <button
                    onClick={() => {
                        setActiveCategory(null);
                        setSelectedPlace(null);
                    }}
                    className="p-2 rounded-xl bg-muted/60 hover:bg-muted text-foreground transition-colors"
                    title="Retour aux catégories"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Catégorie</span>
                    <h2 className="text-lg font-black text-foreground leading-tight">
                        {currentCategory?.label}
                    </h2>
                </div>
            </div>

            {/* Liste des lieux */}
            <div className="divide-y divide-border/60 max-h-[600px] overflow-y-auto no-scrollbar">
                {places.map((place, index) => {
                    const status = getOpenStatus(place.openTime, place.closeTime);
                    const isSelected = selectedPlace?.id === place.id;

                    return (
                        <div key={place.id} className="bg-white">
                            {isSelected ? (
                                /* FICHE DÉTAILLÉE DU LIEU */
                                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                                    <div className="rounded-2xl overflow-hidden border border-border h-52 relative">
                                        <ImageSlider images={place.images} alt={place.title} />
                                        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                                            <h3 className="text-xl font-black drop-shadow-md">{place.title}</h3>
                                            <p className="hanzi text-sm font-bold text-amber-300 drop-shadow">{place.chineseTitle}</p>
                                        </div>
                                    </div>

                                    {/* Ratings Dianping / TripAdvisor */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {place.ratings.map((r, idx) => (
                                            <div key={idx} className="p-2.5 rounded-xl bg-[#FCFAF5] border border-border text-center">
                                                <span className="text-[10px] font-bold uppercase text-muted-foreground block">{r.source}</span>
                                                <span className="text-lg font-black text-primary">{r.score}</span>
                                                <span className="text-[10px] text-muted-foreground block">/ 5</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Astuce Terrain */}
                                    {place.tips && (
                                        <div className="p-3.5 rounded-xl bg-gold-light border border-gold/30 space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gold-dark">
                                                <Lightbulb className="w-4 h-4 text-gold" />
                                                <span>Conseil Local</span>
                                            </div>
                                            <p className="text-xs text-foreground/90 leading-relaxed">
                                                {place.tips}
                                            </p>
                                        </div>
                                    )}

                                    {/* Adresse et Actions */}
                                    <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Adresse</span>
                                            <button
                                                onClick={() => playSpeech(place.chineseTitle || place.address)}
                                                className="p-1 text-primary hover:bg-white rounded"
                                                title="Prononcer"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="hanzi text-xs font-semibold text-foreground leading-relaxed">
                                            {place.address}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">{place.pinyin}</p>
                                    </div>

                                    {/* Boutons d'action */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <button
                                            onClick={(e) => handleAdd(place, e)}
                                            className={cn(
                                                "p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm",
                                                isAdded(place.id)
                                                    ? "bg-muted text-muted-foreground"
                                                    : "bg-primary text-white hover:bg-primary/90"
                                            )}
                                        >
                                            {isAdded(place.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            {isAdded(place.id) ? "Dans l'agenda" : "Ajouter à l'agenda"}
                                        </button>

                                        <button
                                            onClick={() => copyForDidi(place.chineseTitle + " " + place.address)}
                                            className="p-3 rounded-xl bg-white border border-border text-foreground text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-muted/50 transition-colors shadow-sm"
                                        >
                                            {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-primary" />}
                                            Copier pour DiDi
                                        </button>
                                    </div>

                                    {/* Réduire */}
                                    <button
                                        onClick={() => setSelectedPlace(null)}
                                        className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground text-center"
                                    >
                                        Fermer les détails
                                    </button>
                                </div>
                            ) : (
                                /* CARTE CONDENSÉE DE LA LISTE */
                                <div
                                    onClick={() => setSelectedPlace(place)}
                                    className="p-3.5 flex gap-3 hover:bg-[#FCFAF5] cursor-pointer transition-colors"
                                >
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                                        <Image
                                            src={place.images[0]}
                                            alt={place.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-primary text-white text-[9px] font-bold">
                                            #{index + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-1">
                                                <h3 className="font-bold text-sm text-foreground truncate">{place.title}</h3>
                                                <button
                                                    onClick={(e) => handleAdd(place, e)}
                                                    className={cn(
                                                        "p-1.5 rounded-lg transition-transform active:scale-90 shrink-0",
                                                        isAdded(place.id)
                                                            ? "bg-muted text-muted-foreground"
                                                            : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                                    )}
                                                    title={isAdded(place.id) ? "Dans l'agenda" : "Ajouter"}
                                                >
                                                    {isAdded(place.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                            <p className="hanzi text-xs font-bold text-gold-dark truncate mt-0.5">{place.chineseTitle}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                            <span className="font-bold text-foreground">★ {place.averageRating}</span>
                                            <span>•</span>
                                            <span className="truncate">{place.district}</span>
                                            <span>•</span>
                                            <span className={status.color}>{status.text}</span>
                                        </div>

                                        <p className="text-[11px] text-muted-foreground line-clamp-1 italic">
                                            {place.tips}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
