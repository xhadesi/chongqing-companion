"use client";

import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const QUOTES = [
    {
        hanzi: "读万卷书，行万里路",
        pinyin: "Dú wàn juǎn shū, xíng wàn lǐ lù",
        translation: "Lire dix mille livres, parcourir dix mille lieues."
    },
    {
        hanzi: "千里之行，始于足下",
        pinyin: "Qiān lǐ zhī xíng, shǐ yú zú xià",
        translation: "Un voyage de mille lieues commence par le premier pas."
    },
    {
        hanzi: "不到长城非好汉",
        pinyin: "Bú dào Chángchéng fēi hǎohàn",
        translation: "Qui n'a jamais été à la Grande Muraille n'est pas un brave."
    },
    {
        hanzi: "入乡随俗",
        pinyin: "Rù xiāng suí sú",
        translation: "À Rome, fais comme les Romains."
    },
    {
        hanzi: "四海为家",
        pinyin: "Sì hǎi wéi jiā",
        translation: "Considérer les quatre mers comme sa maison."
    }
];

export function DailyQuote() {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Simple day-based randomization
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        setQuote(QUOTES[dayOfYear % QUOTES.length]);
    }, []);

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Quote className="w-16 h-16 text-slate-900 dark:text-white transform rotate-180" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Proverbe du Jour
                    </span>
                </div>

                <h3 className="text-xl font-medium text-slate-800 dark:text-white font-serif tracking-wide leading-relaxed">
                    {quote.hanzi}
                </h3>

                <div className="space-y-0.5">
                    <p className="text-xs text-slate-400 font-mono tracking-tight">{quote.pinyin}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic font-medium">"{quote.translation}"</p>
                </div>
            </div>
        </div>
    );
}
