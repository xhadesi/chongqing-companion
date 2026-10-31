"use client";

import { Quote, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

const QUOTES = [
    {
        hanzi: "读万卷书，行万里路",
        pinyin: "Dú wàn juǎn shū, xíng wàn lǐ lù",
        translation: "Parcourir dix mille lieues vaut mieux que lire dix mille livres."
    },
    {
        hanzi: "千里之行，始于足下",
        pinyin: "Qiān lǐ zhī xíng, shǐ yú zú xià",
        translation: "Un voyage de mille lieues commence par un premier pas."
    },
    {
        hanzi: "入乡随俗",
        pinyin: "Rù xiāng suí sú",
        translation: "Quand tu entres dans un village, suis ses coutumes."
    },
    {
        hanzi: "四海为家",
        pinyin: "Sì hǎi wéi jiā",
        translation: "Trouver sa maison aux quatre coins du monde."
    },
    {
        hanzi: "温故而知新",
        pinyin: "Wēn gù ér zhī xīn",
        translation: "Méditer le passé permet de comprendre le renouveau."
    }
];

export function DailyQuote() {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        setQuote(QUOTES[dayOfYear % QUOTES.length]);
    }, []);

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="card-clean p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Pensée du jour</span>
                <button
                    onClick={() => playSpeech(quote.hanzi)}
                    className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                    title="Écouter la prononciation"
                >
                    <Volume2 className="w-3.5 h-3.5" />
                </button>
            </div>
            <p className="hanzi text-base font-bold text-foreground leading-snug">
                {quote.hanzi}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
                {quote.pinyin}
            </p>
            <p className="text-xs text-foreground/80 mt-2 italic font-serif">
                « {quote.translation} »
            </p>
        </div>
    );
}
