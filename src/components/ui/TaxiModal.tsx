"use client";

import { X, Navigation } from "lucide-react";
import { useEffect } from "react";

interface TaxiModalProps {
    isOpen: boolean;
    onClose: () => void;
    destinationName: string;
    address: string;
}

export function TaxiModal({ isOpen, onClose, destinationName, address }: TaxiModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col justify-center p-6 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-white/90 text-foreground rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Fermer"
            >
                <X className="w-6 h-6" />
            </button>

            <div
                className="max-w-md w-full mx-auto text-center space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-2">
                    <div className="w-14 h-14 bg-gold-light border border-gold/30 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <Navigation className="w-7 h-7 text-gold" />
                    </div>
                    <p className="text-sm font-bold text-white/90">
                        Veuillez m'emmener à :
                    </p>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-2xl">
                    <h2 className="hanzi text-3xl font-black text-foreground leading-snug break-words">
                        {address}
                    </h2>
                </div>

                <div className="space-y-1">
                    <p className="text-lg font-black text-white">
                        {destinationName}
                    </p>
                    <p className="text-xs text-white/70">
                        Montrez cet écran à votre chauffeur
                    </p>
                </div>
            </div>
        </div>
    );
}
