"use client";

import { useState, useEffect } from "react";
import { TripDay, Activity } from "@/lib/types";

const STORAGE_KEY = "chongqing-agenda";

// Default: Just 3 days to start, user can add more
const DEFAULT_ITINERARY: TripDay[] = Array.from({ length: 3 }, (_, i) => ({
    id: `day-${i + 1}`,
    date: `2024-05-${String(i + 1).padStart(2, "0")}`, // Placeholder dates
    dayNumber: i + 1,
    activities: [],
}));

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export function useAgenda() {
    const [days, setDays] = useState<TripDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unscheduled, setUnscheduled] = useState<Activity[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Backward compatibility: if parsed is array of days
                if (Array.isArray(parsed)) {
                    setDays(parsed);
                    setUnscheduled([]);
                } else {
                    // New format: { days: [], unscheduled: [] }
                    setDays(parsed.days || DEFAULT_ITINERARY);
                    setUnscheduled(parsed.unscheduled || []);
                }
            } catch (e) {
                console.error("Failed to parse agenda", e);
                setDays(DEFAULT_ITINERARY);
            }
        } else {
            setDays(DEFAULT_ITINERARY);
        }
        setIsLoading(false);
    }, []);

    // Save to local storage whenever days/unscheduled change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, unscheduled }));
        }
    }, [days, unscheduled, isLoading]);

    const addActivity = (dayId: string | "unscheduled", activity: Omit<Activity, "id" | "completed">) => {
        const newActivity = { ...activity, id: generateId(), completed: false };

        // Check if already exists (simple title match or ID match in description)
        const exists =
            unscheduled.some(u => u.title === activity.title) ||
            days.some(d => d.activities.some(a => a.title === activity.title));

        if (exists) return; // Prevent duplicates

        if (dayId === "unscheduled") {
            setUnscheduled(prev => [...prev, newActivity]);
        } else {
            setDays((prev) =>
                prev.map((day) => {
                    if (day.id === dayId) {
                        return {
                            ...day,
                            activities: [
                                ...day.activities,
                                newActivity,
                            ].sort((a, b) => a.time.localeCompare(b.time)),
                        };
                    }
                    return day;
                })
            );
        }
    };

    const moveActivity = (activityId: string, sourceDayId: string | "unscheduled", targetDayId: string | "unscheduled", newTime?: string) => {
        // Find the activity first
        let activityToMove: Activity | undefined;

        if (sourceDayId === "unscheduled") {
            activityToMove = unscheduled.find(a => a.id === activityId);
            setUnscheduled(prev => prev.filter(a => a.id !== activityId));
        } else {
            const sourceDay = days.find(d => d.id === sourceDayId);
            activityToMove = sourceDay?.activities.find(a => a.id === activityId);
            setDays(prev => prev.map(d => d.id === sourceDayId ? { ...d, activities: d.activities.filter(a => a.id !== activityId) } : d));
        }

        if (!activityToMove) return;

        // Modify time if needed
        if (newTime) activityToMove.time = newTime;

        // Add to target
        if (targetDayId === "unscheduled") {
            // If moving to unscheduled, strip time? Keep it for reference? Let's keep it.
            setUnscheduled(prev => [...prev, activityToMove!]);
        } else {
            setDays(prev => prev.map(d => d.id === targetDayId ? {
                ...d,
                activities: [...d.activities, activityToMove!].sort((a, b) => a.time.localeCompare(b.time))
            } : d));
        }
    };

    // ... existing toggle/delete/addDay/removeDay/updateDate ...

    const toggleActivity = (dayId: string, activityId: string) => {
        setDays((prev) =>
            prev.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        activities: day.activities.map((act) =>
                            act.id === activityId ? { ...act, completed: !act.completed } : act
                        ),
                    }
                    : day
            )
        );
    };

    const deleteActivity = (dayId: string | "unscheduled", activityId: string) => {
        if (dayId === "unscheduled") {
            setUnscheduled(prev => prev.filter(a => a.id !== activityId));
        } else {
            setDays((prev) =>
                prev.map((day) =>
                    day.id === dayId
                        ? {
                            ...day,
                            activities: day.activities.filter((act) => act.id !== activityId),
                        }
                        : day
                )
            );
        }
    };

    const clearUnscheduled = () => {
        setUnscheduled([]);
    };


    const addDay = () => {
        setDays((prev) => {
            const nextDayNum = prev.length + 1;
            const lastDate = prev.length > 0 ? new Date(prev[prev.length - 1].date) : new Date();
            const nextDate = new Date(lastDate);
            nextDate.setDate(lastDate.getDate() + 1);

            return [
                ...prev,
                {
                    id: `day-${generateId()}`,
                    date: nextDate.toISOString().split('T')[0],
                    dayNumber: nextDayNum,
                    activities: [],
                }
            ];
        });
    };

    const removeDay = (dayId: string) => {
        setDays((prev) => prev.filter(d => d.id !== dayId).map((d, i) => ({ ...d, dayNumber: i + 1 })));
    };

    const updateActivity = (dayId: string | "unscheduled", activityId: string, updates: Partial<Activity>) => {
        if (dayId === "unscheduled") {
            setUnscheduled((prev) =>
                prev.map((act) => (act.id === activityId ? { ...act, ...updates } : act))
            );
        } else {
            setDays((prev) =>
                prev.map((day) =>
                    day.id === dayId
                        ? {
                            ...day,
                            activities: day.activities
                                .map((act) => (act.id === activityId ? { ...act, ...updates } : act))
                                .sort((a, b) => a.time.localeCompare(b.time)),
                        }
                        : day
                )
            );
        }
    };

    const updateDate = (dayId: string, newDate: string) => {
        setDays((prev) => prev.map(d => d.id === dayId ? { ...d, date: newDate } : d));
    };

    return { days, unscheduled, isLoading, addActivity, moveActivity, toggleActivity, deleteActivity, updateActivity, clearUnscheduled, addDay, removeDay, updateDate };
}
