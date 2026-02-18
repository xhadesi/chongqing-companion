"use client";

import { useState, useEffect } from "react";
import { Location } from "@/data/locations";

export function useSavedLocations() {
    const [savedLocations, setSavedLocations] = useState<Location[]>([]);

    // Load on mount
    useEffect(() => {
        const saved = localStorage.getItem("gemini_saved_locations");
        if (saved) {
            try {
                setSavedLocations(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load saved locations", e);
            }
        }
    }, []);

    const saveLocation = (location: Location) => {
        setSavedLocations((prev) => {
            const exists = prev.some((l) => l.id === location.id);
            if (exists) return prev;

            const newLocations = [...prev, location];
            localStorage.setItem("gemini_saved_locations", JSON.stringify(newLocations));
            return newLocations;
        });
    };

    const removeLocation = (id: string) => {
        setSavedLocations((prev) => {
            const newLocations = prev.filter((l) => l.id !== id);
            localStorage.setItem("gemini_saved_locations", JSON.stringify(newLocations));
            return newLocations;
        });
    };

    const isSaved = (id: string) => {
        return savedLocations.some((l) => l.id === id);
    };

    return { savedLocations, saveLocation, removeLocation, isSaved };
}
