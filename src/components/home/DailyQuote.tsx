"use client";

import { Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";

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
        <Card variant="premium" className="p-6 group hover:shadow-lg transition-all duration-500">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote className="w-20 h-20 text-slate-900 dark:text-white transform rotate-180" />
            </div>

            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-1 bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-200/50 dark:border-red-800/50">
                        Proverbe du Jour
                    </span>
                </div>

                <h3 className="text-2xl font-medium text-slate-800 dark:text-white font-serif tracking-wide leading-relaxed">
                    {quote.hanzi}
                </h3>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-mono tracking-tight uppercase opacity-80">{quote.pinyin}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 italic font-medium leading-relaxed">"{quote.translation}"</p>
                </div>
            </div>
        </Card>
    );
}
