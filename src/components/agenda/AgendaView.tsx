"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronRight, X, Clock, MapPin, Navigation, ArrowLeft } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";
import { DayTimeline } from "./DayTimeline";
import { UnscheduledSidebar } from "./UnscheduledSidebar";
import { Activity } from "@/lib/types";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddToAgendaModal } from "./AddToAgendaModal";
// We no longer import @dnd-kit/core stuff

export function AgendaView() {
    const { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, addDay, removeDay, updateDate } = useAgenda();
    const [selectedDayId, setSelectedDayId] = useState<string>("day-1");

    // UI State
    const [dayToDelete, setDayToDelete] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activityToAddId, setActivityToAddId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // Details Slide State
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    // Form state for custom activity
    const [newTime, setNewTime] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDescription, setNewDescription] = useState("");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const selectedDay = days.find((d) => d.id === selectedDayId) || days[0];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;

        const newActivity: any = {
            time: newTime || "09:00",
            title: newTitle,
            location: newLocation,
            image: "https://images.unsplash.com/photo-1550951298-5c7b95a66b90?q=80&w=600&auto=format&fit=crop"
        };

        if (newAddress) newActivity.address = newAddress;
        if (newDescription) newActivity.description = newDescription;

        addActivity(selectedDay.id, newActivity);

        setNewTime("");
        setNewTitle("");
        setNewLocation("");
        setNewAddress("");
        setNewDescription("");
        setIsAdding(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 min-h-screen relative">

            {/* Header / Day Selector */}
            <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-30 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex overflow-x-auto gap-3 p-4 no-scrollbar snap-x items-center">
                    {days.map((day) => {
                        const isSelected = selectedDayId === day.id;
                        const dateObj = new Date(day.date);
                        const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });
                        return (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDayId(day.id)}
                                className={cn(
                                    "flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all snap-center relative border",
                                    isSelected
                                        ? "bg-slate-900 dark:bg-amber-500 text-white shadow-lg shadow-black/10 dark:shadow-amber-500/20 scale-105 border-transparent"
                                        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                                )}
                            >
                                <span className={cn("text-[10px] uppercase font-bold", isSelected ? "text-slate-300 dark:text-amber-100" : "")}>{dayName}</span>
                                <span className="text-2xl font-black leading-none mt-1">{dateObj.getDate()}</span>
                                {day.activities.length > 0 && <div className={cn("absolute bottom-2 w-1.5 h-1.5 rounded-full", isSelected ? "bg-amber-500 dark:bg-white" : "bg-amber-400")} />}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => addDay()}
                        className="flex-shrink-0 w-16 h-20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:border-amber-300 dark:hover:border-amber-600 transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-6 p-4 md:p-6 pb-24">

                {/* Left: Main Timeline */}
                <div className="flex-1 min-w-0">
                    {selectedDay && (
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 min-h-[600px] overflow-hidden">
                            {/* Day Header */}
                            <div className="p-6 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                <div>
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                        <span>Jour {selectedDay.dayNumber}</span>
                                    </div>
                                    <button onClick={() => setIsDatePickerOpen(true)} className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2 hover:text-amber-500 transition-colors">
                                        {new Date(selectedDay.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                        <ChevronRight className="w-5 h-5 opacity-50" />
                                    </button>
                                    {isDatePickerOpen && (
                                        <DatePicker value={selectedDay.date} onChange={(d) => updateDate(selectedDay.id, d)} onClose={() => setIsDatePickerOpen(false)} />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setDayToDelete(selectedDay.id)} className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <DayTimeline
                                dayId={selectedDay.id}
                                activities={selectedDay.activities}
                                onToggle={(id) => toggleActivity(selectedDay.id, id)}
                                onDelete={(id) => deleteActivity(selectedDay.id, id)}
                                onActivityClick={(activity) => setSelectedActivity({ ...activity, _containerId: selectedDay.id } as any)}
                            />

                            {/* Add Custom Activity Button */}
                            <div className="p-4 border-t border-slate-50 dark:border-slate-800 flex justify-center bg-white dark:bg-slate-900">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="flex items-center gap-2 px-8 py-4 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-600 dark:text-amber-500 rounded-2xl font-bold transition-all active:scale-95 border border-amber-100 dark:border-amber-900/50"
                                >
                                    <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-amber-800 dark:text-amber-200" />
                                    </div>
                                    <span>Ajouter une étape</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Staging Area */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <UnscheduledSidebar
                        items={unscheduled}
                        onDelete={(id) => deleteActivity("unscheduled", id)}
                        onAddClick={(id) => {
                            setActivityToAddId(id);
                            setIsAddModalOpen(true);
                        }}
                        onItemClick={(activity) => setSelectedActivity({ ...activity, _containerId: "unscheduled" } as any)}
                    />
                </div>
            </div>

            {/* Custom Activity Form Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 relative animate-in slide-in-from-bottom-10 z-10 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Ajouter une étape</h3>
                        <form onSubmit={handleAdd} className="space-y-3">
                            <input autoFocus type="text" placeholder="Quoi ? (Ex: Restaurant)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl font-bold outline-none ring-2 ring-transparent focus:ring-amber-500 transition-all placeholder:text-slate-400" />
                            <div className="flex gap-2">
                                <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-24 p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl font-bold outline-none focus:ring-amber-500" />
                                <input type="text" placeholder="Quartier / Lieu" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="flex-1 p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl font-medium outline-none focus:ring-amber-500 text-sm placeholder:text-slate-400" />
                            </div>
                            <input type="text" placeholder="Adresse précise (pour GPS)" value={newAddress} onChange={e => setNewAddress(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl font-medium outline-none focus:ring-amber-500 text-sm placeholder:text-slate-400" />
                            <textarea
                                placeholder="Description / Notes..."
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl font-medium outline-none focus:ring-amber-500 text-sm h-24 resize-none placeholder:text-slate-400"
                            />

                            <button type="submit" className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 dark:shadow-none mt-2 active:scale-95 transition-transform">Ajouter au Jour {selectedDay.dayNumber}</button>
                        </form>
                        <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 p-2 text-slate-300 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><X className="w-5 h-5" /></button>
                    </div>
                </div>
            )}

            {/* Delete Day Confirm */}
            <ConfirmModal
                isOpen={!!dayToDelete}
                onClose={() => setDayToDelete(null)}
                onConfirm={() => {
                    if (dayToDelete) removeDay(dayToDelete);
                }}
                title="Supprimer cette journée ?"
                message="Toutes les activités de cette journée seront supprimées définitivement."
                isDestructive={true}
            />

            {/* Plan Unscheduled Item Modal */}
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

            {/* Details Sliding Modal */}
            {selectedActivity && (
                <div className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm p-0 flex flex-col animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-300">
                    <div className="relative h-64 md:h-80 w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                        {selectedActivity.image ? (
                            <img
                                src={selectedActivity.image}
                                alt={selectedActivity.title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                {selectedActivity.icon || "🏙️"}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <button
                            onClick={() => setSelectedActivity(null)}
                            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 text-white transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-2xl md:text-3xl font-black text-white mb-1 shadow-black/50 text-shadow-sm leading-tight">{selectedActivity.title}</h1>
                            {selectedActivity.time && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 rounded-full text-white text-xs font-bold shadow-md">
                                    <Clock className="w-3.5 h-3.5" />
                                    {selectedActivity.time}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-4xl mx-auto w-full">

                        {(selectedActivity.location || selectedActivity.address) && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <MapPin className="w-5 h-5 text-amber-500" />
                                    Localisation
                                </h3>
                                {selectedActivity.location && <p className="text-sm font-medium text-slate-700 dark:text-slate-300"><span className="text-slate-400">Quartier:</span> {selectedActivity.location}</p>}
                                {selectedActivity.address && <p className="text-sm font-medium text-slate-700 dark:text-slate-300"><span className="text-slate-400">Adresse:</span> {selectedActivity.address}</p>}
                            </div>
                        )}

                        {selectedActivity.description && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <span className="text-xl">📝</span> Détails / Notes
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                    {selectedActivity.description}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                            {(selectedActivity as any)._containerId === "unscheduled" ? (
                                <button
                                    onClick={() => {
                                        setActivityToAddId(selectedActivity.id);
                                        setIsAddModalOpen(true);
                                        setSelectedActivity(null);
                                    }}
                                    className="w-full sm:flex-1 h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-200 dark:shadow-none transition-transform active:scale-95"
                                >
                                    <Plus className="w-5 h-5" />
                                    Planifier ce lieu
                                </button>
                            ) : (
                                <div className="w-full sm:flex-1 flex gap-2">
                                    <button
                                        onClick={() => {
                                            // Basic prompt wrapper for time update since we removed the inline time edit
                                            const newVal = window.prompt("Nouvelle heure (HH:MM):", selectedActivity.time);
                                            if (newVal) {
                                                updateActivity((selectedActivity as any)._containerId, selectedActivity.id, { time: newVal });
                                                setSelectedActivity({ ...selectedActivity, time: newVal });
                                            }
                                        }}
                                        className="flex-1 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Clock className="w-5 h-5" />
                                        Changer l'heure
                                    </button>
                                </div>
                            )}

                            {selectedActivity.address && (
                                <a
                                    href={`https://www.amap.com/search?query=${encodeURIComponent(selectedActivity.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Navigation className="w-5 h-5" />
                                    Ouvrir GPS
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

