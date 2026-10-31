"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GUIDE_DATA, CATEGORIES, GuidePlace, CategoryId } from "@/data/guideData";
import { MapPin, Plus, Check, ArrowLeft, Lightbulb, Clock, Copy, Volume2, Star, Navigation, X } from "lucide-react";
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

    // Prevent body scroll when full modal is open on iOS
    useEffect(() => {
        if (activeCategory || selectedPlace) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeCategory, selectedPlace]);

    const places = activeCategory ? GUIDE_DATA.filter(p => p.category === activeCategory).sort((a, b) => b.averageRating - a.averageRating) : [];
    const currentCategory = activeCategory ? CATEGORIES.find(c => c.id === activeCategory) : null;

    const isAdded = (id: string) => {
        const inUnscheduled = unscheduled.some(u => u.title.includes(id) || u.description?.includes(id));
        const inDays = days.some(d => d.activities.some(a => a.title.includes(id) || a.description?.includes(id)));
        return inUnscheduled || inDays;
    };

    const getOpenStatus = (open: string, close: string) => {
        if (!now) return { isOpen: false, text: "Horaire non vérifié", color: "text-muted-foreground" };

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
            color: isOpen ? "text-emerald-600 font-bold" : "text-primary font-bold",
            hours: `${open} - ${close}`
        };
    };

    const handleAdd = (place: GuidePlace, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
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

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="px-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                            Guide & Découverte
                        </span>
                        <h2 className="text-2xl font-black text-foreground tracking-tight mt-0.5">
                            Lieux & Saveurs de Chongqing
                        </h2>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Sélection de spots incontournables, street food et trésors cachés testés sur place.
                </p>
            </div>

            {/* Grid des Catégories : cartes généreuses avec photos réelles */}
            <div className="grid grid-cols-2 gap-3.5">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className="card-warm overflow-hidden text-left hover:border-primary/60 transition-all active:scale-[0.97] group flex flex-col shadow-sm"
                    >
                        <div className="relative aspect-[16/11] w-full bg-stone-200">
                            <Image
                                src={cat.images[0]}
                                alt={cat.label}
                                fill
                                sizes="(max-width: 768px) 50vw, 300px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                <h3 className="font-black text-sm leading-tight drop-shadow-md">{cat.label}</h3>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* MODAL FULLSCREEN 1 : LISTE DES LIEUX (SCROLL NATIVE 120HZ IPHONE) */}
            {activeCategory && !selectedPlace && (
                <div className="fixed inset-0 z-50 bg-[#F8F5EE] flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
                    {/* Sticky iOS Top Bar */}
                    <header className="sticky top-0 z-30 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-border px-4 py-3.5 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setActiveCategory(null)}
                            className="p-2 -ml-2 rounded-xl text-foreground hover:bg-stone-200/50 flex items-center gap-1.5 text-xs font-bold transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-foreground" />
                            <span>Retour</span>
                        </button>

                        <div className="text-center">
                            <h3 className="text-base font-black text-foreground">
                                {currentCategory?.label}
                            </h3>
                            <span className="text-[11px] text-muted-foreground font-semibold">
                                {places.length} lieux recommandés
                            </span>
                        </div>

                        <div className="w-16" />
                    </header>

                    {/* Liste complète avec défilement fluide pleine page */}
                    <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 pb-36">
                        {places.map((place, idx) => {
                            const status = getOpenStatus(place.openTime, place.closeTime);

                            return (
                                <div
                                    key={place.id}
                                    onClick={() => setSelectedPlace(place)}
                                    className="card-warm p-4 flex gap-3.5 hover:border-primary/50 cursor-pointer active:scale-[0.98] transition-all shadow-sm"
                                >
                                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-stone-200 shrink-0 border border-border">
                                        <Image
                                            src={place.images[0]}
                                            alt={place.title}
                                            fill
                                            sizes="120px"
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-black shadow-sm">
                                            #{idx + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                        <div className="space-y-1">
                                            <div className="flex items-start justify-between gap-1">
                                                <h4 className="font-black text-base text-foreground leading-snug truncate pr-1">
                                                    {place.title}
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleAdd(place, e)}
                                                    className={cn(
                                                        "p-2 rounded-xl transition-transform active:scale-90 shrink-0",
                                                        isAdded(place.id)
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                                            : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                                    )}
                                                    title={isAdded(place.id) ? "Dans l'agenda" : "Ajouter à l'agenda"}
                                                >
                                                    {isAdded(place.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                </button>
                                            </div>

                                            <p className="hanzi text-xs font-bold text-gold-dark truncate">
                                                {place.chineseTitle}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                                            <span className="font-bold text-foreground flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                {place.averageRating}
                                            </span>
                                            <span>•</span>
                                            <span className="truncate">{place.district}</span>
                                            <span>•</span>
                                            <span className={status.color}>{status.text}</span>
                                        </div>

                                        <p className="text-xs text-muted-foreground line-clamp-1 italic pt-0.5">
                                            « {place.tips} »
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* MODAL FULLSCREEN 2 : FICHE COMPLÈTE DU LIEU SÉLECTIONNÉ */}
            {selectedPlace && (
                <div className="fixed inset-0 z-50 bg-[#F8F5EE] flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
                    <header className="sticky top-0 z-30 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-border px-4 py-3.5 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setSelectedPlace(null)}
                            className="p-2 -ml-2 rounded-xl text-foreground hover:bg-stone-200/50 flex items-center gap-1 text-xs font-bold transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-foreground" />
                            <span>Retour à la liste</span>
                        </button>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            Fiche Complète
                        </span>
                        <div className="w-16" />
                    </header>

                    <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5 pb-36 max-w-lg mx-auto w-full">
                        {/* Carrousel Photos */}
                        <div className="rounded-3xl overflow-hidden border border-border h-64 relative bg-stone-200 shadow-sm">
                            <ImageSlider images={selectedPlace.images} alt={selectedPlace.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                                <h1 className="text-2xl font-black drop-shadow-md leading-tight">{selectedPlace.title}</h1>
                                <p className="hanzi text-base font-bold text-amber-300 drop-shadow">{selectedPlace.chineseTitle}</p>
                            </div>
                        </div>

                        {/* Notes Réelles */}
                        <div className="grid grid-cols-2 gap-2.5">
                            {selectedPlace.ratings.map((r, idx) => (
                                <div key={idx} className="p-3 rounded-2xl bg-white border border-border text-center shadow-sm">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">{r.source}</span>
                                    <span className="text-2xl font-black text-primary mt-0.5 block">{r.score}</span>
                                    <span className="text-[10px] text-muted-foreground">Score certifié</span>
                                </div>
                            ))}
                        </div>

                        {/* Conseils & Astuces locales */}
                        {selectedPlace.tips && (
                            <div className="card-warm p-4 border-l-4 border-l-gold space-y-1.5 bg-gold-light/40">
                                <div className="flex items-center gap-2 text-xs font-bold text-gold-dark">
                                    <Lightbulb className="w-4 h-4 text-gold shrink-0" />
                                    <span>Conseil Pratique sur Place</span>
                                </div>
                                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                                    {selectedPlace.tips}
                                </p>
                            </div>
                        )}

                        {/* Adresse Chinoise & Prononciation */}
                        <div className="card-warm p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Adresse Chinoise (pour DiDi)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => playSpeech(selectedPlace.chineseTitle || selectedPlace.address)}
                                    className="p-1.5 rounded-lg text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold"
                                >
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>Prononcer</span>
                                </button>
                            </div>
                            <p className="hanzi text-sm font-semibold text-foreground leading-relaxed">
                                {selectedPlace.address}
                            </p>
                            <p className="text-xs text-muted-foreground">{selectedPlace.pinyin}</p>
                        </div>

                        {/* Description du lieu */}
                        {selectedPlace.description && (
                            <div className="card-warm p-4 space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    À Propos
                                </span>
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    {selectedPlace.description}
                                </p>
                            </div>
                        )}

                        {/* Boutons d'Action Principaux */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => handleAdd(selectedPlace)}
                                className={cn(
                                    "p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95",
                                    isAdded(selectedPlace.id)
                                        ? "bg-emerald-600 text-white"
                                        : "bg-primary text-white hover:bg-primary/90"
                                )}
                            >
                                {isAdded(selectedPlace.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isAdded(selectedPlace.id) ? "Dans votre planning" : "Ajouter au planning"}
                            </button>

                            <button
                                type="button"
                                onClick={() => copyForDidi(selectedPlace.chineseTitle + " " + selectedPlace.address)}
                                className="p-3.5 rounded-2xl bg-white border border-border text-foreground text-xs font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors shadow-sm active:scale-95"
                            >
                                {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-primary" />}
                                <span>{copiedAddress ? "Copié !" : "Copier pour DiDi"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
