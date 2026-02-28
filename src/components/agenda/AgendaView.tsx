"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronRight, X, Clock, MapPin, Navigation, ArrowLeft, Timer } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";
import { DayTimeline } from "./DayTimeline";
import { UnscheduledSidebar } from "./UnscheduledSidebar";
import { Activity } from "@/lib/types";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddToAgendaModal } from "./AddToAgendaModal";
import { ImageSlider } from "@/components/ui/ImageSlider";

export function AgendaView() {
    const { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, addDay, removeDay, updateDate } = useAgenda();
    const [selectedDayId, setSelectedDayId] = useState<string>("");
    const [animationKey, setAnimationKey] = useState(0);
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

    // Set default selected day once loaded
    useEffect(() => {
        if (!isLoading && days.length > 0) {
            if (!selectedDayId || !days.find(d => d.id === selectedDayId)) {
                setSelectedDayId(days[0].id);
            }
        }
    }, [days, isLoading, selectedDayId]);

    const changeDay = (newDayId: string) => {
        if (newDayId === selectedDayId) return;

        const currentIndex = days.findIndex(d => d.id === selectedDayId);
        const newIndex = days.findIndex(d => d.id === newDayId);

        if (currentIndex !== -1 && newIndex !== -1) {
            setSlideDirection(newIndex > currentIndex ? "right" : "left");
            setAnimationKey(prev => prev + 1);
        }
        setSelectedDayId(newDayId);
    };

    // UI State
    const [dayToDelete, setDayToDelete] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activityToAddId, setActivityToAddId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // Swipe state for changing days
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchEndY, setTouchEndY] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchEndY(null);
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

        const distanceX = touchStartX - touchEndX;
        const distanceY = touchStartY - touchEndY;

        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

        if (isHorizontalSwipe) {
            const isLeftSwipe = distanceX > minSwipeDistance;
            const isRightSwipe = distanceX < -minSwipeDistance;

            if (isLeftSwipe || isRightSwipe) {
                const currentIndex = days.findIndex(d => d.id === selectedDayId);
                const actualIndex = currentIndex !== -1 ? currentIndex : 0;

                if (isLeftSwipe && actualIndex < days.length - 1) { // Swipe left -> Next day
                    changeDay(days[actualIndex + 1].id);
                }
                if (isRightSwipe && actualIndex > 0) { // Swipe right -> Prev day
                    changeDay(days[actualIndex - 1].id);
                }
            }
        }
    };

    // Details Slide State
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Handling browser back button / iOS swipe back for the Details Slide
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (isDetailsOpen) {
                // If the slide was open and user swiped back/pressed back, close the slide
                setIsDetailsOpen(false);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isDetailsOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isDetailsOpen) {
            document.body.style.overflow = 'hidden';
            // Also prevent touchmove on the background for iOS Safari
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isDetailsOpen]);

    const handleOpenActivity = (activity: any, containerId: string) => {
        setSelectedActivity({ ...activity, _containerId: containerId } as any);
        setIsDetailsOpen(true);
        window.history.pushState({ activityDetailsOpen: true }, "");
    };

    const handleCloseActivity = () => {
        setIsDetailsOpen(false);
        if (window.history.state?.activityDetailsOpen) {
            window.history.back();
        }
    };

    // Form state for custom activity
    const [newTime, setNewTime] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDescription, setNewDescription] = useState("");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
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
            images: ["https://images.unsplash.com/photo-1550951298-5c7b95a66b90?q=80&w=600&auto=format&fit=crop"]
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
                                onClick={() => changeDay(day.id)}
                                className={cn(
                                    "flex-shrink-0 flex flex-col items-center justify-center min-w-[5rem] px-2 h-20 rounded-2xl transition-all snap-center relative border",
                                    isSelected
                                        ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-lg shadow-black/10 dark:shadow-indigo-500/20 scale-105 border-transparent"
                                        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                                )}
                            >
                                <span className={cn("text-[10px] uppercase font-bold", isSelected ? "text-slate-300 dark:text-indigo-100" : "")}>{dayName}</span>
                                <span className="text-2xl font-black leading-none mt-1">{dateObj.getDate()}</span>
                                {day.activities.length > 0 && <div className={cn("absolute bottom-2 w-1.5 h-1.5 rounded-full", isSelected ? "bg-indigo-500 dark:bg-white" : "bg-indigo-400")} />}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => addDay()}
                        className="flex-shrink-0 w-16 h-20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-6 p-4 md:p-6 pb-32">
                {/* Left: Main Timeline */}
                <div
                    className="flex-1 min-w-0"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {selectedDay && (
                        <div
                            key={`day-view-${animationKey}`}
                            className={cn(
                                "bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 min-h-[600px] overflow-hidden",
                                "animate-in duration-300 fill-mode-forwards",
                                slideDirection === "right" ? "slide-in-from-right-8 fade-in-0" : "slide-in-from-left-8 fade-in-0"
                            )}
                        >
                            {/* Day Header */}
                            <div className="p-6 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                <div>
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                        <span>Jour {selectedDay.dayNumber}</span>
                                    </div>
                                    <button onClick={() => setIsDatePickerOpen(true)} className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2 hover:text-indigo-500 transition-colors">
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
                                onClick={(activity) => handleOpenActivity(activity, selectedDay.id)}
                                onTimeEdit={(id, newTime) => updateActivity(selectedDay.id, id, { time: newTime })}
                                onDurationEdit={(id, newDuration) => updateActivity(selectedDay.id, id, { duration: newDuration })}
                            />

                            {/* Add Custom Activity Button */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800/60 flex justify-center bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="group flex flex-col items-center gap-2 transition-all active:scale-95"
                                >
                                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center group-hover:bg-indigo-700 group-hover:scale-110 transition-all border-4 border-slate-50 dark:border-slate-900 z-10">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        Nouvelle étape
                                    </span>
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
                        onItemClick={(activity) => handleOpenActivity(activity, "unscheduled")}
                    />
                </div>
            </div>

            {/* Custom Activity Form Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 relative animate-in zoom-in-95 z-10 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-black mb-6 text-slate-800 dark:text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            Organiser
                        </h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input type="text" placeholder="Titre (ex: Restaurant, Musée...)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400" />

                            <div className="flex gap-3">
                                <input type="text" placeholder="Heure" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-1/3 p-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500 text-sm placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 transition-all" />
                                <input type="text" placeholder="Lieu ou Quartier" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl font-medium outline-none ring-2 ring-transparent focus:ring-indigo-500 text-sm placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 transition-all" />
                            </div>

                            <input type="text" placeholder="Adresse précise (si besoin)" value={newAddress} onChange={e => setNewAddress(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl font-medium outline-none ring-2 ring-transparent focus:ring-indigo-500 text-sm placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 transition-all" />

                            <textarea
                                placeholder="Notes, réservation, infos utiles..."
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl font-medium outline-none ring-2 ring-transparent focus:ring-indigo-500 text-sm h-28 resize-none placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 transition-all custom-scrollbar"
                            />

                            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold tracking-wide shadow-lg shadow-indigo-600/20 active:scale-95 hover:bg-indigo-700 transition-all mt-4">
                                Valider et Ajouter
                            </button>
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
            {isDetailsOpen && selectedActivity && (
                <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-0 flex flex-col animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-200">
                    <>
                        <div className="relative h-64 md:h-80 w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                            {selectedActivity.images && selectedActivity.images.length > 0 ? (
                                <ImageSlider
                                    images={selectedActivity.images}
                                    alt={selectedActivity.title}
                                    className="h-full w-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl shadow-sm">
                                    {selectedActivity.icon || "🏙️"}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <button
                                onClick={handleCloseActivity}
                                className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 text-white transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h1 className="text-2xl md:text-3xl font-black text-white mb-1 shadow-black/50 text-shadow-sm leading-tight">{selectedActivity.title}</h1>
                                {selectedActivity.time && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 rounded-full text-white text-xs font-bold shadow-md">
                                        <Clock className="w-3.5 h-3.5" />
                                        {selectedActivity.time}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-4xl mx-auto w-full pb-32">

                            {(selectedActivity.location || selectedActivity.address) && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <MapPin className="w-5 h-5 text-indigo-600" />
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
                                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 whitespace-pre-wrap">
                                        {selectedActivity.description}
                                    </div>
                                </div>
                            )}

                            {selectedActivity.tips && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <span className="text-xl">💡</span> Conseils Spécialisés
                                    </h3>
                                    <div className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm bg-blue-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-blue-200 dark:border-indigo-800/40 whitespace-pre-wrap shadow-sm shadow-blue-100 dark:shadow-none">
                                        {selectedActivity.tips}
                                    </div>
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
                                                const newVal = window.prompt("Nouvelle heure (ex: 20:00):", selectedActivity.time);
                                                if (newVal !== null && newVal !== selectedActivity.time) {
                                                    updateActivity((selectedActivity as any)._containerId, selectedActivity.id, { time: newVal });
                                                    setSelectedActivity({ ...selectedActivity, time: newVal });
                                                }
                                            }}
                                            className="flex-1 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
                                        >
                                            <Clock className="w-5 h-5" />
                                            Heure
                                        </button>
                                        <button
                                            onClick={() => {
                                                const newVal = window.prompt("Nouvelle durée (ex: 1h30):", selectedActivity.duration || "");
                                                if (newVal !== null) {
                                                    updateActivity((selectedActivity as any)._containerId, selectedActivity.id, { duration: newVal });
                                                    setSelectedActivity({ ...selectedActivity, duration: newVal });
                                                }
                                            }}
                                            className="flex-1 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
                                        >
                                            <Timer className="w-5 h-5" />
                                            Durée
                                        </button>
                                    </div>
                                )}

                                {selectedActivity.address && (
                                    <a
                                        href={`https://www.amap.com/search?query=${encodeURIComponent(selectedActivity.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
                                    >
                                        <Navigation className="w-5 h-5" />
                                        Ouvrir GPS
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                </div>
            )}
        </div>
    );
}
