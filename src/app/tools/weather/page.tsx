"use client";

import { WeatherWidget } from "@/components/tools/WeatherWidget";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WeatherPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="p-4 border-b border-border bg-white/50 backdrop-blur sticky top-0 z-10 flex items-center gap-4">
                <Link href="/tools" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <h1 className="font-bold text-lg">Météo</h1>
            </header>

            <div className="flex-1 p-4 pb-24">
                <WeatherWidget />
            </div>
        </div>
    );
}
