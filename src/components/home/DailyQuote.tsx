"use client";

import { Volume2 } from "lucide-react";
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
        translation: "Un voyage de mille lieues commence toujours par un premier pas."
    },
    {
        hanzi: "入乡随俗",
        pinyin: "Rù xiāng suí sú",
        translation: "Quand tu entres dans un village, conforme-toi à ses coutumes."
    },
    {
        hanzi: "四海为家",
        pinyin: "Sì hǎi wéi jiā",
        translation: "Considérer les quatre mers comme sa demeure."
    },
    {
        hanzi: "温故而知新",
        pinyin: "Wēn gù ér zhī xīn",
        translation: "Méditer le passé permet de comprendre le nouveau."
    }
];

export function DailyQuote() {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        setQuote(QUOTES[day % QUOTES.length]);
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
        <div className="card-warm p-5 space-y-2 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    Pensée Classique Chinoise
                </span>
                <button
                    onClick={() => playSpeech(quote.hanzi)}
                    className="p-1.5 rounded-lg border border-border bg-white text-muted-foreground hover:text-primary transition-colors"
                    title="Écouter la prononciation"
                >
                    <Volume2 className="w-3.5 h-3.5" />
                </button>
            </div>
            <p className="hanzi text-xl font-black text-foreground tracking-wide">
                {quote.hanzi}
            </p>
            <p className="text-xs font-semibold text-gold-dark">
                {quote.pinyin}
            </p>
            <p className="text-xs text-foreground/80 italic font-serif pt-1">
                « {quote.translation} »
            </p>
        </div>
    );
}
