"use client";

import Link from "next/link";
import { WeatherWidget } from "@/components/tools/WeatherWidget";
import { WorldClock } from "@/components/tools/WorldClock";
import { SpicyMeter } from "@/components/tools/SpicyMeter";
import { CurrencyConverter } from "@/components/tools/CurrencyConverter";
import { MessageSquareText, Luggage } from "lucide-react";

export default function ToolsPage() {
    return (
        <div className="max-w-lg mx-auto p-4 pt-6 pb-28 space-y-5">
            <header className="px-1 space-y-0.5">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Boîte à Outils</span>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Outils du Voyage</h1>
                <p className="text-xs text-muted-foreground">Tout ce qu'il vous faut sur place en un clin d'œil.</p>
            </header>

            {/* Quick Access to Specialized Pages */}
            <div className="grid grid-cols-2 gap-3">
                <Link
                    href="/guide/phrases"
                    className="card-warm p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
                >
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                        <MessageSquareText className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-foreground">Phrases Vocales</h3>
                        <p className="text-[10px] text-muted-foreground">Prononciation mandarin</p>
                    </div>
                </Link>

                <Link
                    href="/checklists"
                    className="card-warm p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
                >
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                        <Luggage className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-foreground">Checklists</h3>
                        <p className="text-[10px] text-muted-foreground">Départ & souvenirs</p>
                    </div>
                </Link>
            </div>

            {/* Main Interactive Tools */}
            <CurrencyConverter />
            <SpicyMeter />
            <WeatherWidget />
            <WorldClock />
        </div>
    );
}
