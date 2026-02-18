"use client";

import { X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    isDestructive = false
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{message}</p>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${isDestructive
                                ? "bg-red-500 shadow-red-200 hover:bg-red-600"
                                : "bg-slate-900 shadow-slate-200 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
