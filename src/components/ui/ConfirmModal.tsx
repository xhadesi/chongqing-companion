"use client";

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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 animate-in zoom-in-95 duration-200 shadow-2xl border border-border">
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-black text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
                </div>

                <div className="flex gap-2.5 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-xs text-muted-foreground bg-muted hover:bg-stone-200 transition-colors active:scale-95"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs text-white shadow-sm transition-transform active:scale-95 ${isDestructive
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-foreground hover:bg-foreground/90"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
