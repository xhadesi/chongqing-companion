"use client";

import Link from "next/link";
import { WeatherWidget } from "@/components/tools/WeatherWidget";
import { WorldClock } from "@/components/tools/WorldClock";
import { SpicyMeter } from "@/components/tools/SpicyMeter";
import { CurrencyConverter } from "@/components/tools/CurrencyConverter";
import { CarTaxiFront, MessageSquareText, Luggage, ArrowRight } from "lucide-react";

export default function ToolsPage() {
    return (
        <div className="max-w-lg mx-auto p-4 pt-6 pb-28 space-y-5">
            <header className="space-y-1">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Boîte à Outils</span>
                <h1 className="text-2xl font-black text-foreground tracking-tight">Outils de Survie</h1>
                <p className="text-xs text-muted-foreground">Utilitaires indispensables pour votre séjour à Chongqing.</p>
            </header>

            {/* Quick Access to Main Subpages */}
            <div className="grid grid-cols-3 gap-2.5">
                <Link
                    href="/taxi"
                    className="card-clean p-3 flex flex-col justify-between hover:border-primary/50 transition-colors group"
                >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit">
                        <CarTaxiFront className="w-4 h-4" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-xs font-bold text-foreground">Cartes Taxi</h3>
                        <p className="text-[10px] text-muted-foreground truncate">Plein écran</p>
                    </div>
                </Link>

                <Link
                    href="/guide/phrases"
                    className="card-clean p-3 flex flex-col justify-between hover:border-primary/50 transition-colors group"
                >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit">
                        <MessageSquareText className="w-4 h-4" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-xs font-bold text-foreground">Phrases Audio</h3>
                        <p className="text-[10px] text-muted-foreground truncate">Mandarin vocal</p>
                    </div>
                </Link>

                <Link
                    href="/checklists"
                    className="card-clean p-3 flex flex-col justify-between hover:border-primary/50 transition-colors group"
                >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit">
                        <Luggage className="w-4 h-4" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-xs font-bold text-foreground">Bagages</h3>
                        <p className="text-[10px] text-muted-foreground truncate">Checklists</p>
                    </div>
                </Link>
            </div>

            {/* In-page Tools */}
            <CurrencyConverter />
            <SpicyMeter />
            <WeatherWidget />
            <WorldClock />
        </div>
    );
}
