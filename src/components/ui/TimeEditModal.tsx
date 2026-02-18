"use client";

import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";

interface TimeEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (time: string) => void;
    initialTime: string;
}

export function TimeEditModal({ isOpen, onClose, onConfirm, initialTime }: TimeEditModalProps) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (isOpen) setTime(initialTime || "09:00");
    }, [isOpen, initialTime]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(time);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-300 hover:bg-slate-100 rounded-full">
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 justify-center">
                    <Clock className="w-6 h-6 text-amber-500" />
                    Modifier l'heure
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="bg-slate-50 border-2 border-slate-100 text-slate-900 text-4xl font-black rounded-2xl px-6 py-4 text-center focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all w-full"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-200 hover:bg-amber-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Valider
                    </button>
                </form>
            </div>
        </div>
    );
}
