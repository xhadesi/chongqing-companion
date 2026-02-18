"use client";

import { useState } from "react";
import { Mic, Volume2, ArrowRightLeft, X, MessageCircle, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHRASES, PhraseCategory } from "@/data/phrases";

export function Translator() {
    const [isOpen, setIsOpen] = useState(false);
    const [headerExpanded, setHeaderExpanded] = useState(true);
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [activeTab, setActiveTab] = useState<'translate' | 'phrases'>('translate');
    const [copied, setCopied] = useState(false);

    const handleTranslate = () => {
        // Mock translation for demo
        if (!inputText) return;
        setTranslatedText("你好 (Simulated Translation)");
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        中
                    </div>
                    <div>
                        <h2 className="font-black text-slate-800">Traducteur</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase">CN ↔ FR</p>
                    </div>
                </div>
                <div className="flex bg-white p-1 rounded-full border border-slate-200">
                    <button
                        onClick={() => setActiveTab('translate')}
                        className={cn("px-4 py-1.5 rounded-full text-sm font-bold transition-all", activeTab === 'translate' ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-600")}
                    >
                        Texte
                    </button>
                    <button
                        onClick={() => setActiveTab('phrases')}
                        className={cn("px-4 py-1.5 rounded-full text-sm font-bold transition-all", activeTab === 'phrases' ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-600")}
                    >
                        Phrases
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
                {activeTab === 'translate' ? (
                    <div className="space-y-4">
                        {/* Input */}
                        <div className="relative">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Tapez ici..."
                                className="w-full h-32 bg-slate-50 rounded-2xl p-4 text-lg font-bold text-slate-700 outline-none resize-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                            />
                            <button
                                className="absolute bottom-3 right-3 p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:scale-110 transition-transform"
                                onClick={() => setInputText("")}
                            >
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsListening(!isListening)}
                                className={cn(
                                    "flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all",
                                    isListening ? "bg-red-50 text-red-500 border-2 border-red-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                <Mic className={cn("w-5 h-5", isListening && "animate-pulse")} />
                                {isListening ? "Écoute..." : "Parler"}
                            </button>
                            <button
                                onClick={handleTranslate}
                                className="flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
                            >
                                <ArrowRightLeft className="w-5 h-5" />
                                Traduire
                            </button>
                        </div>

                        {/* Result */}
                        {translatedText && (
                            <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-200">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <MessageCircle className="w-24 h-24 rotate-12" />
                                </div>
                                <p className="text-2xl font-black relative z-10 mb-4 leading-relaxed">{translatedText}</p>
                                <div className="flex items-center gap-3 relative z-10">
                                    <button className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                                        <Volume2 className="w-5 h-5 text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleCopy(translatedText)}
                                        className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {Object.entries(PHRASES).map(([categoryName, items]) => (
                            <div key={categoryName} className="space-y-3 mb-6">
                                <h3 className="font-black text-slate-800 flex items-center gap-2">
                                    <span className="text-xl">
                                        {categoryName === "Bases" ? "👋" : categoryName === "Transport" ? "🚗" : categoryName === "Cuisine" ? "🍜" : "🆘"}
                                    </span>
                                    {categoryName}
                                </h3>
                                <div className="grid gap-3">
                                    {items.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleCopy(item.cn)}
                                            className="bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-100 text-left transition-colors group"
                                        >
                                            <p className="font-bold text-slate-800 mb-1">{item.fr}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-blue-600 font-medium">{item.cn}</p>
                                                <p className="text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded-md border border-slate-100">{item.pinyin}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
