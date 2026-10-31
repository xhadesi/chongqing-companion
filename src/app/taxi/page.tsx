"use client";

import { TaxiCards } from "@/components/tools/TaxiCards";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TaxiPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="p-1.5 -ml-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-base font-bold text-foreground">Cartes Chauffeur</h1>
                        <p className="text-[11px] text-muted-foreground">Destinations et adresses en chinois</p>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 pb-28">
                <TaxiCards />
            </main>
        </div>
    );
}
