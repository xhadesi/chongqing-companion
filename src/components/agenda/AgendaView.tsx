"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronRight, X, Clock, MapPin, Navigation, ArrowLeft, Timer, Banknote, Volume2, Map, List, Copy, Check } from "lucide-react";
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
import Link from "next/link";

export function AgendaView() {
    const { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, addDay, removeDay, updateDate } = useAgenda();
    const [selectedDayId, setSelectedDayId] = useState<string>("");
    const [viewMode, setViewMode] = useState<"timeline" | "map">("timeline");
    const [dayToDelete, setDayToDelete] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activityToAddId, setActivityToAddId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);

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

    const handleCloseActivity = () => {
        setIsDetailsOpen(false);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;

        const newActivity: any = {
            time: newTime || "09:00",
            title: newTitle,
            location: newLocation,
            images: ["https://images.unsplash.com/photo-1550951298-5c7b95a66b90?q=80&w=600&auto=format&fit=crop"]
        };

        if (newAddress) newActivity.address = newAddress;
        if (newDescription) newActivity.description = newDescription;
        if (newPrice) newActivity.priceEstimate = newPrice;

        addActivity(selectedDayId || days[0].id, newActivity);

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
        <div className="flex flex-col min-h-screen bg-background pb-28">
            {/* Sticky Day Selector */}
            <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="flex overflow-x-auto gap-2 p-3 no-scrollbar snap-x items-center max-w-5xl mx-auto">
                    {days.map((day) => {
                        const isSelected = selectedDayId === day.id;
                        const dateObj = new Date(day.date);
                        const dayName = dateObj.toLocaleDateString("fr-FR", { weekday: "short" });

                        return (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDayId(day.id)}
                                className={cn(
                                    "flex-shrink-0 flex flex-col items-center justify-center min-w-[4.25rem] px-2 h-16 rounded-xl transition-all border snap-center",
                                    isSelected
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="text-[10px] uppercase font-bold tracking-wider">{dayName}</span>
                                <span className="text-lg font-black leading-none mt-1">{dateObj.getDate()}</span>
                                {day.activities.length > 0 && (
                                    <span className={cn("w-1 h-1 rounded-full mt-1.5", isSelected ? "bg-white" : "bg-primary")} />
                                )}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => addDay()}
                        className="flex-shrink-0 w-12 h-16 rounded-xl border border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        title="Ajouter un jour"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Sub-header: Current Day & View Toggle */}
            <div className="max-w-5xl mx-auto w-full px-4 pt-4 flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Jour {selectedDay?.dayNumber || 1}
                    </span>
                    {selectedDay && (
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="text-lg font-black text-foreground flex items-center gap-1.5 hover:text-primary transition-colors"
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

                {/* View Switcher: Timeline vs Map */}
                <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-xl border border-border">
                    <button
                        onClick={() => setViewMode("timeline")}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors",
                            viewMode === "timeline" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <List className="w-3.5 h-3.5" />
                        Timeline
                    </button>
                    <button
                        onClick={() => setViewMode("map")}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors",
                            viewMode === "map" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Map className="w-3.5 h-3.5" />
                        Carte
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto w-full px-4 pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Center / Left: Day Activities or Map */}
                <div className="lg:col-span-2 space-y-4">
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
                                />
                            ) : (
                                <DayMap activities={selectedDay.activities} />
                            )}

                            {/* Add Step Button */}
                            <button
                                onClick={() => setIsAdding(true)}
                                className="w-full py-3.5 rounded-xl border border-dashed border-border bg-card/60 hover:bg-card hover:border-primary text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
                            >
                                <Plus className="w-4 h-4 text-primary" />
                                Ajouter une étape à ce jour
                            </button>
                        </>
                    )}
                </div>

                {/* Right: Unscheduled Sidebar */}
                <div className="lg:col-span-1">
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
            </div>

            {/* Add Custom Activity Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-sm rounded-2xl p-5 border border-border shadow-xl space-y-4 animate-in zoom-in-95">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Ajouter une étape</h3>
                            <button onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-2.5">
                            <input
                                type="text"
                                placeholder="Nom de l'étape (ex: Hongyadong, Déjeuner...)"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Prix (ex: 20 ¥)"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Quartier ou Lieu"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Adresse précise (pour le chauffeur)"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none hanzi"
                            />
                            <textarea
                                placeholder="Notes, repères ou astuces..."
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                rows={3}
                                className="w-full text-xs p-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-lacquer transition-colors"
                            >
                                Enregistrer l'étape
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Activity Details Slide Over */}
            {isDetailsOpen && selectedActivity && (
                <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto animate-in fade-in duration-200">
                    {/* Top Bar */}
                    <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
                        <button
                            onClick={handleCloseActivity}
                            className="p-1.5 -ml-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-1 text-xs font-semibold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Fiche Étape
                        </span>
                        <div className="w-8" />
                    </header>

                    <div className="max-w-xl mx-auto w-full p-5 space-y-5 pb-32">
                        {/* Cover Image or Slider */}
                        {selectedActivity.images && selectedActivity.images.length > 0 && (
                            <div className="rounded-2xl overflow-hidden border border-border h-56 bg-muted">
                                <ImageSlider images={selectedActivity.images} alt={selectedActivity.title} />
                            </div>
                        )}

                        {/* Title & Chinese Hanzi */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-primary">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{selectedActivity.time || "Horaire libre"}</span>
                                {selectedActivity.duration && <span>• {selectedActivity.duration}</span>}
                            </div>
                            <h1 className="text-2xl font-black text-foreground tracking-tight">
                                {selectedActivity.title}
                            </h1>
                            {selectedActivity.chineseTitle && (
                                <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                                    <div>
                                        <p className="hanzi text-lg font-bold text-foreground">
                                            {selectedActivity.chineseTitle}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => playSpeech(selectedActivity.chineseTitle!)}
                                        className="p-2 rounded-lg bg-card border border-border text-primary hover:bg-muted transition-colors"
                                        title="Prononcer en chinois"
                                    >
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Action buttons: Copy for DiDi & Map */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                onClick={() => copyText((selectedActivity.chineseTitle ? selectedActivity.chineseTitle + " " : "") + (selectedActivity.address || selectedActivity.title))}
                                className="p-3 rounded-xl bg-primary text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                {copiedAddress ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                                Copier pour DiDi
                            </button>

                            <a
                                href={`https://www.amap.com/search?query=${encodeURIComponent(selectedActivity.chineseTitle || selectedActivity.address || selectedActivity.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-card border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                            >
                                <Navigation className="w-4 h-4 text-primary" />
                                Ouvrir dans Amap
                            </a>
                        </div>

                        {/* Address */}
                        {selectedActivity.address && (
                            <div className="card-clean p-4 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Adresse Chinoise
                                </span>
                                <p className="hanzi text-sm font-medium text-foreground leading-relaxed">
                                    {selectedActivity.address}
                                </p>
                            </div>
                        )}

                        {/* Description */}
                        {selectedActivity.description && (
                            <div className="card-clean p-4 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Description & Contexte
                                </span>
                                <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {selectedActivity.description}
                                </p>
                            </div>
                        )}

                        {/* Tips */}
                        {selectedActivity.tips && (
                            <div className="card-clean p-4 border-primary/20 bg-primary/5 space-y-1">
                                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                                    Conseil Pratique
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
