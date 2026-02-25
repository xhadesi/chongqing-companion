"use client";

import Link from "next/link";
import { ArrowLeft, Volume2, Search } from "lucide-react";
import { PHRASES, PhraseCategory } from "@/data/phrases";
import { useState } from "react";

export default function PhrasesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const categories = Object.keys(PHRASES) as PhraseCategory[];

    const playAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.85; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Désolé, la lecture audio n'est pas supportée sur ce navigateur.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 p-4 flex items-center gap-4 z-10 transition-colors">
                <Link href="/tools" className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group">
                    <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">Phrases de Survie</h1>
            </div>

            <div className="max-w-2xl mx-auto p-6 space-y-8">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une phrase (ex: Taxi, Eau...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                    />
                </div>

                {/* Phrase Categories */}
                <div className="space-y-6">
                    {categories.map((category) => {
                        const filteredPhrases = PHRASES[category].filter(
                            (phrase) =>
                                phrase.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                phrase.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                phrase.cn.includes(searchTerm)
                        );

                        if (filteredPhrases.length === 0) return null;

                        return (
                            <section key={category} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4 pl-2 border-l-4 border-primary">
                                    {category}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {filteredPhrases.map((phrase) => (
                                        <div
                                            key={phrase.id}
                                            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col justify-between"
                                        >
                                            <div className="pr-12">
                                                <p className="text-xs font-semibold text-primary mb-1">{phrase.fr}</p>
                                                <p className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">{phrase.cn}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{phrase.pinyin}</p>
                                            </div>

                                            <button
                                                onClick={() => playAudio(phrase.cn)}
                                                className="absolute top-1/2 -translate-y-1/2 right-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                                                aria-label="Écouter la prononciation"
                                            >
                                                <Volume2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {searchTerm && !categories.some(c => PHRASES[c].some(p => p.fr.toLowerCase().includes(searchTerm.toLowerCase()) || p.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) || p.cn.includes(searchTerm))) && (
                    <div className="text-center text-slate-400 py-10 animate-in fade-in">
                        <p>Aucune phrase trouvée pour "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
