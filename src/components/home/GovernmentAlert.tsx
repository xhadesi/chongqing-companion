"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGeminiAlertStatus } from "@/app/actions/gemini";

interface GovernmentAlertProps {
    initialAlert?: boolean;
    initialMessage?: string;
}

export function GovernmentAlert({ initialAlert = false, initialMessage }: GovernmentAlertProps) {
    const [hasAlert, setHasAlert] = useState(initialAlert);
    const [message, setMessage] = useState(initialMessage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const data = await getGeminiAlertStatus();
                if (data) {
                    setHasAlert(data.hasAlert);
                    setMessage(data.message);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
    }, []);

    if (loading) return (
        <div className="w-full h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700" />
    );

    return (
        <a href="https://translate.google.com/translate?sl=zh-CN&tl=fr&u=www.gov.cn" target="_blank" rel="noopener noreferrer" className={cn(
            "block w-full rounded-[1.5rem] p-4 flex items-start gap-4 shadow-lg border transaction-all duration-300 relative overflow-hidden group active:scale-95 backdrop-blur-md",
            hasAlert
                ? "bg-red-50/90 border-red-200 text-red-900 dark:bg-red-900/40 dark:border-red-800 dark:text-red-100 shadow-red-500/10"
                : "bg-emerald-50/90 border-emerald-200 text-emerald-900 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-100 shadow-emerald-500/10"
        )}>
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 5px)', backgroundSize: '10px 10px' }}
            />

            <div className={cn(
                "p-2 rounded-xl shrink-0 relative z-10",
                hasAlert ? "bg-red-100/50" : "bg-emerald-100/50"
            )}>
                {hasAlert ? <AlertTriangle className="w-5 h-5 text-red-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>

            <div className="relative z-10 pt-0.5">
                <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm mb-0.5 uppercase tracking-wide opacity-80">
                        {hasAlert ? "Alerte Officielle" : "Statut Chine"}
                    </h4>
                    <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-current opacity-70">www.gov.cn</span>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-95">
                    {message || (hasAlert ? "Alerte en cours." : "Aucune annonce gouvernementale importante. Tout est OK.")}
                </p>
            </div>
        </a>
    );
}
