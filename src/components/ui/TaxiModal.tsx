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
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col justify-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-300"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Fermer"
            >
                <X className="w-8 h-8" />
            </button>

            <div
                className="max-w-md w-full mx-auto text-center space-y-12"
                onClick={e => e.stopPropagation()}
            >
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Navigation className="w-10 h-10 text-amber-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-500 dark:text-slate-400">
                        Veuillez m'emmener à :
                    </p>
                    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Please take me to:
                    </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-inner">
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight break-words">
                        {address}
                    </h2>
                </div>

                <div className="opacity-60 space-y-2">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-300">
                        {destinationName}
                    </p>
                    <p className="text-sm font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 inline-block px-4 py-2 rounded-full">
                        Xiè xiè (Merci)
                    </p>
                </div>
            </div>
        </div>
    );
}
