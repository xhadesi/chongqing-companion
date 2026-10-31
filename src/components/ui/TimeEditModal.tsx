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

    const handleQuickTime = (t: string) => {
        setTime(t);
    };

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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 animate-in zoom-in-95 duration-200 shadow-2xl border border-border">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-stone-100 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-black text-foreground mb-5 flex items-center gap-2 justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                    Modifier l'horaire
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex justify-center">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="bg-stone-50 border border-border text-foreground text-3xl font-black rounded-2xl px-6 py-3.5 text-center focus:outline-none focus:border-primary transition-all w-full"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickTime("10:00")}
                            className="p-2 rounded-xl bg-gold-light text-gold-dark text-xs font-bold border border-gold/30 hover:bg-gold-light/80 transition-colors"
                        >
                            Matin (10h)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickTime("14:00")}
                            className="p-2 rounded-xl bg-gold-light text-gold-dark text-xs font-bold border border-gold/30 hover:bg-gold-light/80 transition-colors"
                        >
                            Midi (14h)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickTime("19:00")}
                            className="p-2 rounded-xl bg-gold-light text-gold-dark text-xs font-bold border border-gold/30 hover:bg-gold-light/80 transition-colors"
                        >
                            Soir (19h)
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-primary text-white rounded-xl font-black text-xs shadow-md hover:bg-primary/90 active:scale-95 transition-all"
                    >
                        Valider l'horaire
                    </button>
                </form>
            </div>
        </div>
    );
}
