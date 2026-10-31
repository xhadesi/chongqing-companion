"use client";

import Link from "next/link";
import { ArrowLeft, Volume2, Search } from "lucide-react";
import { PHRASES, PhraseCategory } from "@/data/phrases";
import { useState } from "react";

export default function PhrasesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const categories = Object.keys(PHRASES) as PhraseCategory[];

    const playAudio = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-28">
            {/* Header */}
            <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border p-3.5 flex items-center gap-3 z-10">
                <Link
                    href="/tools"
                    className="p-1.5 -ml-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-base font-bold text-foreground">Phrases de Survie</h1>
                    <p className="text-[11px] text-muted-foreground">Mandarin phonétique et audio instantané</p>
                </div>
            </div>

            <div className="max-w-lg mx-auto p-4 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher (ex: Eau, Taxi, Combien, Toilettes...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-card border border-border rounded-xl focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
                    />
                </div>

                {/* Phrase Categories */}
                <div className="space-y-5">
                    {categories.map((category) => {
                        const filteredPhrases = PHRASES[category].filter(
                            (phrase) =>
                                phrase.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                phrase.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                phrase.cn.includes(searchTerm)
                        );

                        if (filteredPhrases.length === 0) return null;

                        return (
                            <section key={category} className="space-y-2">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-primary px-1">
                                    {category}
                                </h2>
                                <div className="grid gap-2">
                                    {filteredPhrases.map((phrase) => (
                                        <div
                                            key={phrase.id}
                                            className="card-clean p-3.5 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                                        >
                                            <div className="space-y-0.5 min-w-0">
                                                <p className="text-xs font-semibold text-foreground">
                                                    {phrase.fr}
                                                </p>
                                                <p className="hanzi text-base font-bold text-foreground leading-snug">
                                                    {phrase.cn}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground">
                                                    {phrase.pinyin}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => playAudio(phrase.cn)}
                                                className="p-2 rounded-xl bg-muted/60 border border-border text-primary hover:bg-primary hover:text-white transition-colors shrink-0 shadow-sm active:scale-95"
                                                title="Écouter la prononciation"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
