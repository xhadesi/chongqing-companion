"use client";

import { useState, useEffect } from "react";
import {
    Plus, Trash2, ChevronRight, X, Clock, MapPin, Navigation,
    ArrowLeft, Timer, Volume2, Map, List, Copy, Check, Bookmark
} from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";
import { DayTimeline } from "./DayTimeline";
import { DayMap } from "./DayMap";
import { UnscheduledSidebar } from "./UnscheduledSidebar";
import { Activity } from "@/lib/types";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddToAgendaModal } from "./AddToAgendaModal";
import { ImageSlider } from "@/components/ui/ImageSlider";

export function AgendaView() {
    const {
        days, unscheduled, isLoading, addActivity, moveActivity,
        toggleActivity, deleteActivity, updateActivity, addDay, removeDay, updateDate
    } = useAgenda();

    const [selectedDayId, setSelectedDayId] = useState<string>("");
    const [viewMode, setViewMode] = useState<"timeline" | "map">("timeline");
    const [dayToDelete, setDayToDelete] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activityToAddId, setActivityToAddId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [showUnscheduled, setShowUnscheduled] = useState(false);

    // Selected Activity Slide State
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // New activity form inputs
    const [newTime, setNewTime] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");

    useEffect(() => {
        if (!isLoading && days.length > 0) {
            if (!selectedDayId || !days.find(d => d.id === selectedDayId)) {
                setSelectedDayId(days[0].id);
            }
        }
    }, [days, isLoading, selectedDayId]);

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    const copyText = (text: string) => {
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

    const handleOpenActivity = (activity: any, containerId: string) => {
        setSelectedActivity({ ...activity, _containerId: containerId });
        setIsDetailsOpen(true);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;

        const newAct: any = {
            time: newTime || "10:00",
            title: newTitle,
            location: newLocation,
            images: ["/images/places/sight_1_1.jpg"]
        };

        if (newAddress) newAct.address = newAddress;
        if (newDescription) newAct.description = newDescription;
        if (newPrice) newAct.priceEstimate = newPrice;

        addActivity(selectedDayId || days[0].id, newAct);

        setNewTime("");
        setNewTitle("");
        setNewLocation("");
        setNewAddress("");
        setNewDescription("");
        setNewPrice("");
        setIsAdding(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 space-y-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground">Chargement de votre carnet de voyage...</p>
            </div>
        );
    }

    const selectedDay = days.find((d) => d.id === selectedDayId) || days[0];

    return (
        <div className="max-w-lg mx-auto flex flex-col min-h-screen bg-background pb-32">
            {/* Sticky Day Pills Carousel */}
            <div className="sticky top-0 z-30 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-border/80">
                <div className="flex overflow-x-auto gap-2 p-3 no-scrollbar snap-x items-center">
                    {days.map((day) => {
                        const isSelected = selectedDayId === day.id;
                        const dateObj = new Date(day.date);
                        const dayName = dateObj.toLocaleDateString("fr-FR", { weekday: "short" });

                        return (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDayId(day.id)}
                                className={cn(
                                    "flex-shrink-0 flex flex-col items-center justify-center min-w-[4.25rem] px-2 h-16 rounded-2xl transition-all border snap-center",
                                    isSelected
                                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105"
                                        : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-primary/40 shadow-sm"
                                )}
                            >
                                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isSelected ? "text-amber-200" : "text-muted-foreground")}>
                                    {dayName}
                                </span>
                                <span className="text-lg font-black leading-none mt-1">
                                    {dateObj.getDate()}
                                </span>
                                {day.activities.length > 0 && (
                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5", isSelected ? "bg-amber-300" : "bg-primary")} />
                                )}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => addDay()}
                        className="flex-shrink-0 w-12 h-16 rounded-2xl border border-dashed border-border bg-white/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        title="Ajouter un jour au voyage"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Sub-Header: Day title, Date picker, View toggles */}
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                Jour {selectedDay?.dayNumber || 1}
                            </span>
                            <span className="text-xs text-muted-foreground">• {selectedDay?.activities.length || 0} arrêts</span>
                        </div>
                        {selectedDay && (
                            <button
                                onClick={() => setIsDatePickerOpen(true)}
                                className="text-xl font-black text-foreground flex items-center gap-1.5 hover:text-primary transition-colors mt-0.5"
                            >
                                {new Date(selectedDay.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </button>
                        )}
                        {isDatePickerOpen && selectedDay && (
                            <DatePicker
                                value={selectedDay.date}
                                onChange={(d) => updateDate(selectedDay.id, d)}
                                onClose={() => setIsDatePickerOpen(false)}
                            />
                        )}
                    </div>

                    {/* Segmented View Switcher */}
                    <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-border shadow-sm">
                        <button
                            onClick={() => setViewMode("timeline")}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all select-none",
                                viewMode === "timeline" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <List className="w-3.5 h-3.5" />
                            Timeline
                        </button>
                        <button
                            onClick={() => setViewMode("map")}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all select-none",
                                viewMode === "map" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Map className="w-3.5 h-3.5" />
                            Carte
                        </button>
                    </div>
                </div>

                {/* Bouton drawer "À planifier" */}
                {unscheduled.length > 0 && (
                    <button
                        onClick={() => setShowUnscheduled(!showUnscheduled)}
                        className="w-full p-2.5 rounded-xl bg-gold-light border border-gold/30 text-gold-dark text-xs font-bold flex items-center justify-between transition-colors shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-gold" />
                            <span>{unscheduled.length} lieu{unscheduled.length > 1 ? "x" : ""} en attente de planification</span>
                        </div>
                        <span className="text-[11px] underline">
                            {showUnscheduled ? "Masquer" : "Afficher"}
                        </span>
                    </button>
                )}

                {showUnscheduled && (
                    <div className="pt-2 animate-in fade-in duration-200">
                        <UnscheduledSidebar
                            items={unscheduled}
                            onDelete={(id) => deleteActivity("unscheduled", id)}
                            onAddClick={(id) => {
                                setActivityToAddId(id);
                                setIsAddModalOpen(true);
                            }}
                            onItemClick={(activity) => handleOpenActivity(activity, "unscheduled")}
                        />
                    </div>
                )}
            </div>

            {/* Timeline or Map View */}
            <div className="px-4 space-y-4">
                {selectedDay && (
                    <>
                        {viewMode === "timeline" ? (
                            <DayTimeline
                                dayId={selectedDay.id}
                                activities={selectedDay.activities}
                                onToggle={(id) => toggleActivity(selectedDay.id, id)}
                                onDelete={(id) => deleteActivity(selectedDay.id, id)}
                                onClick={(activity) => handleOpenActivity(activity, selectedDay.id)}
                                onTimeEdit={(id, newTime) => updateActivity(selectedDay.id, id, { time: newTime })}
                                onDurationEdit={(id, newDuration) => updateActivity(selectedDay.id, id, { duration: newDuration })}
                                onAddClick={() => setIsAdding(true)}
                            />
                        ) : (
                            <DayMap activities={selectedDay.activities} />
                        )}

                        {/* Add Step Button */}
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-bold text-primary flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter une étape à cette journée
                        </button>
                    </>
                )}
            </div>

            {/* Add Custom Activity Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-border shadow-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-black text-foreground">Nouvelle étape</h3>
                            <button onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Nom de l'étape (ex: Hongyadong, Restaurant...)"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Prix (ex: 30 ¥)"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Quartier (ex: Yuzhong)"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Adresse en chinois pour DiDi"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none hanzi"
                            />
                            <textarea
                                placeholder="Notes, repères ou conseils..."
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                rows={3}
                                className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-border focus:border-primary outline-none resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                            >
                                Enregistrer dans la journée
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Activity Details Slide Over (Full Screen Bottom Sheet) */}
            {isDetailsOpen && selectedActivity && (
                <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto animate-in fade-in duration-200">
                    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
                        <button
                            onClick={() => setIsDetailsOpen(false)}
                            className="p-1.5 -ml-1 text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-1 text-xs font-bold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            Détail de l'étape
                        </span>
                        <div className="w-8" />
                    </header>

                    <div className="max-w-lg mx-auto w-full p-5 space-y-5 pb-32">
                        {selectedActivity.images && selectedActivity.images.length > 0 && (
                            <div className="rounded-2xl overflow-hidden border border-border h-60 bg-muted">
                                <ImageSlider images={selectedActivity.images} alt={selectedActivity.title} />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-black text-primary">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{selectedActivity.time || "Horaire libre"}</span>
                                {selectedActivity.duration && <span>• {selectedActivity.duration}</span>}
                            </div>
                            <h1 className="text-2xl font-black text-foreground tracking-tight">
                                {selectedActivity.title}
                            </h1>
                            {selectedActivity.chineseTitle && (
                                <div className="p-3.5 rounded-2xl bg-[#FCFAF5] border border-border flex items-center justify-between">
                                    <p className="hanzi text-xl font-bold text-primary">
                                        {selectedActivity.chineseTitle}
                                    </p>
                                    <button
                                        onClick={() => playSpeech(selectedActivity.chineseTitle!)}
                                        className="p-2 rounded-xl bg-white border border-border text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
                                        title="Prononcer"
                                    >
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Boutons d'action : DiDi & Amap */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                onClick={() => copyText((selectedActivity.chineseTitle ? selectedActivity.chineseTitle + " " : "") + (selectedActivity.address || selectedActivity.title))}
                                className="p-3.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
                            >
                                {copiedAddress ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                                Copier pour DiDi
                            </button>

                            <a
                                href={`https://www.amap.com/search?query=${encodeURIComponent(selectedActivity.chineseTitle || selectedActivity.address || selectedActivity.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 rounded-xl bg-white border border-border text-foreground text-xs font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors shadow-sm"
                            >
                                <Navigation className="w-4 h-4 text-primary" />
                                Ouvrir dans Amap
                            </a>
                        </div>

                        {selectedActivity.address && (
                            <div className="card-warm p-4 space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Adresse Chinoise
                                </span>
                                <p className="hanzi text-sm font-semibold text-foreground leading-relaxed">
                                    {selectedActivity.address}
                                </p>
                            </div>
                        )}

                        {selectedActivity.description && (
                            <div className="card-warm p-4 space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Description
                                </span>
                                <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {selectedActivity.description}
                                </p>
                            </div>
                        )}

                        {selectedActivity.tips && (
                            <div className="card-warm p-4 border-l-4 border-l-gold space-y-1 bg-gold-light/40">
                                <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">
                                    Astuce Locale
                                </span>
                                <p className="text-xs text-foreground/90 leading-relaxed">
                                    {selectedActivity.tips}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Confirm modals */}
            <ConfirmModal
                isOpen={!!dayToDelete}
                onClose={() => setDayToDelete(null)}
                onConfirm={() => {
                    if (dayToDelete) removeDay(dayToDelete);
                }}
                title="Supprimer cette journée ?"
                message="Toutes les étapes associées seront supprimées."
                isDestructive={true}
            />

            <AddToAgendaModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                activityTitle={unscheduled.find(a => a.id === activityToAddId)?.title || "Activité"}
                days={days.map(d => ({ id: d.id, dayNumber: d.dayNumber, date: d.date }))}
                onAdd={(time, dayId) => {
                    if (activityToAddId) {
                        moveActivity(activityToAddId, "unscheduled", dayId, time);
                        setIsAddModalOpen(false);
                        setActivityToAddId(null);
                    }
                }}
            />
        </div>
    );
}
