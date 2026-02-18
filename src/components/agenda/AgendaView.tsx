"use client";

import { useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    TouchSensor
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Plus, Trash2, CalendarDays, ChevronRight, X, MapPin } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";
import { DayTimeline } from "./DayTimeline";
import { UnscheduledSidebar } from "./UnscheduledSidebar";
import { Activity } from "@/lib/types";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddToAgendaModal } from "./AddToAgendaModal";

export function AgendaView() {
    const { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, clearUnscheduled, addDay, removeDay, updateDate } = useAgenda();
    const [selectedDayId, setSelectedDayId] = useState<string>("day-1");
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<Activity | null>(null);
    const [dayToDelete, setDayToDelete] = useState<string | null>(null);

    // Modal Add State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activityToAddId, setActivityToAddId] = useState<string | null>(null);

    const [isAdding, setIsAdding] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // Form state
    const [newTime, setNewTime] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Prevent accidental drag on tap
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }), // Hold to drag on mobile
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const selectedDay = days.find((d) => d.id === selectedDayId) || days[0];

    // Find item for DragOverlay
    const findItem = (id: string) => {
        const inDay = days.flatMap(d => d.activities).find(a => a.id === id);
        const inUnscheduled = unscheduled.find(a => a.id === id);
        return inDay || inUnscheduled;
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        setActiveItem(findItem(active.id as string) || null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        // We can handle visual updates here if needed
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveItem(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Determine source container
        const sourceUnscheduled = unscheduled.find(a => a.id === activeId);
        const sourceDay = days.find(d => d.activities.find(a => a.id === activeId));
        const sourceId = sourceUnscheduled ? "unscheduled" : sourceDay?.id;

        // Determine target container
        let targetContainerId: string | null = null;

        if (overId === "unscheduled") {
            targetContainerId = "unscheduled";
        } else if (days.some(d => d.id === overId)) {
            targetContainerId = overId;
        } else {
            const overItemUnscheduled = unscheduled.find(a => a.id === overId);
            const overItemDay = days.find(d => d.activities.find(a => a.id === overId));
            if (overItemUnscheduled) targetContainerId = "unscheduled";
            if (overItemDay) targetContainerId = overItemDay.id;
        }

        if (sourceId && targetContainerId && sourceId !== targetContainerId) {
            // If dragging to a day, ensure it has a time
            let newTime = undefined;
            if (targetContainerId !== "unscheduled") {
                const item = sourceUnscheduled || sourceDay?.activities.find(a => a.id === activeId);
                // If Item has no time (empty string) or is default "00:00", give it a sensible default
                if (!item?.time || item.time === "") {
                    newTime = "09:00";
                }
            }
            moveActivity(activeId, sourceId, targetContainerId, newTime);
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;

        // Start creating the activity object
        const newActivity: any = {
            time: newTime || "09:00", // Default morning time if not set
            title: newTitle,
            location: newLocation,
            image: "https://images.unsplash.com/photo-1550951298-5c7b95a66b90?q=80&w=600&auto=format&fit=crop"
        };

        // Add address if present
        // @ts-ignore
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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-full bg-slate-50 min-h-screen">
                {/* Header / Day Selector */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 border-b border-slate-100 shadow-sm">
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
                                        "flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all snap-center",
                                        isSelected ? "bg-slate-900 text-white shadow-lg scale-105" : "bg-white border border-slate-100 text-slate-400"
                                    )}
                                >
                                    <span className="text-[10px] uppercase font-bold">{dayName}</span>
                                    <span className="text-2xl font-black">{dateObj.getDate()}</span>
                                    {day.activities.length > 0 && <div className="w-1 h-1 bg-amber-500 rounded-full mt-1" />}
                                </button>
                            );
                        })}
                        <button onClick={() => addDay()} className="flex-shrink-0 w-16 h-20 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-amber-500 hover:border-amber-300 transition-colors">
                            <Plus className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-6 p-4 md:p-6 pb-32">
                    {/* Left: Main Timeline */}
                    <div className="flex-1 min-w-0">
                        {selectedDay && (
                            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 min-h-[600px] overflow-hidden">
                                {/* Day Header */}
                                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                                            <span>Jour {selectedDay.dayNumber}</span>
                                        </div>
                                        <button onClick={() => setIsDatePickerOpen(true)} className="text-2xl font-black text-slate-800 flex items-center gap-2 hover:text-amber-500 transition-colors">
                                            {new Date(selectedDay.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                            <ChevronRight className="w-5 h-5 opacity-50" />
                                        </button>
                                        {isDatePickerOpen && (
                                            <DatePicker value={selectedDay.date} onChange={(d) => updateDate(selectedDay.id, d)} onClose={() => setIsDatePickerOpen(false)} />
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setDayToDelete(selectedDay.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>

                                <DayTimeline
                                    dayId={selectedDay.id}
                                    activities={selectedDay.activities}
                                    onToggle={(id) => toggleActivity(selectedDay.id, id)}
                                    onDelete={(id) => deleteActivity(selectedDay.id, id)}
                                    onUpdate={(id, updates) => updateActivity(selectedDay.id, id, updates)}
                                />

                                {/* Add Activity Button (Inline) */}
                                <div className="p-4 border-t border-slate-50 flex justify-center bg-white">
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="flex items-center gap-2 px-8 py-4 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-2xl font-bold transition-all active:scale-95"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
                                            <Plus className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <span>Ajouter une activité</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Staging Area */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="sticky top-28 h-[calc(100vh-8rem)]">
                            <UnscheduledSidebar
                                items={unscheduled}
                                onDelete={(id) => deleteActivity("unscheduled", id)}
                                onAddClick={(id) => {
                                    setActivityToAddId(id);
                                    setIsAddModalOpen(true);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* FAB Removed */}

                {/* Add Modal */}
                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
                        <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-in slide-in-from-bottom-10 z-10 shadow-2xl">
                            <h3 className="text-xl font-bold mb-4 text-slate-800">Ajouter une activité</h3>
                            <form onSubmit={handleAdd} className="space-y-3">
                                <input autoFocus type="text" placeholder="Quoi ? (Ex: Restaurant)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none ring-2 ring-transparent focus:ring-amber-500 transition-all" />
                                <div className="flex gap-2">
                                    <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-24 p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-amber-500" />
                                    <input type="text" placeholder="Quartier / Lieu" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="flex-1 p-4 bg-slate-50 rounded-xl font-medium outline-none focus:ring-amber-500 text-sm" />
                                </div>
                                <input type="text" placeholder="Adresse précise (pour GPS)" value={newAddress} onChange={e => setNewAddress(e.target.value)} className="w-full p-4 bg-slate-50 rounded-xl font-medium outline-none focus:ring-amber-500 text-sm" />
                                <textarea
                                    placeholder="Description / Notes..."
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                    className="w-full p-4 bg-slate-50 rounded-xl font-medium outline-none focus:ring-amber-500 text-sm h-24 resize-none"
                                />

                                <button type="submit" className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 mt-2">Ajouter au Jour {selectedDay.dayNumber}</button>
                            </form>
                            <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 p-2 text-slate-300 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>
                    </div>
                )}

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
            </div>

            {/* Drag Overlay Item (Preview) */}
            <DragOverlay>
                {activeItem ? (
                    <div className="bg-white p-4 rounded-2xl border-2 border-amber-400 shadow-xl opacity-90 rotate-3 cursor-grabbing w-64 z-50">
                        <h4 className="font-bold text-slate-800">{activeItem.title}</h4>
                        {activeItem.time && <span className="text-xs bg-slate-100 px-2 py-1 rounded inline-block mt-1 font-mono">{activeItem.time}</span>}
                    </div>
                ) : null}
            </DragOverlay>

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
        </DndContext>
    );
}

// Simple Check Icon specifically for the button
function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

