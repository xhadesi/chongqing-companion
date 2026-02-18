"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { CarFront } from "lucide-react";
import { WeatherWidget } from "@/components/tools/WeatherWidget";
import { WorldClock } from "@/components/tools/WorldClock";
import { SpicyMeter } from "@/components/tools/SpicyMeter";
import { CurrencyConverter } from "@/components/tools/CurrencyConverter";

export default function ToolsPage() {


    return (
        <div className="min-h-screen p-6 pb-32">
            <header className="mb-8">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Utilitaires</span>
                <h1 className="text-3xl font-black text-slate-800">Boîte à Outils</h1>
                <p className="text-muted-foreground mt-1">Sélectionnez un outil.</p>
            </header>

            <section className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WeatherWidget />
                    <WorldClock />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SpicyMeter />
                    <CurrencyConverter />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/taxi" className="bg-card dark:bg-card p-5 rounded-[2rem] border border-border shadow-sm hover:shadow-md transition-all active:scale-95 group relative overflow-hidden flex flex-col justify-between h-48">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                                <CarFront className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl text-foreground mb-1">Taxi Cards</h3>
                            <p className="text-xs text-muted-foreground">Montrer au chauffeur</p>
                        </div>

                        <div className="relative z-10 flex justify-end">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">Ouvrir &rarr;</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
