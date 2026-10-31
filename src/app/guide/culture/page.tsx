"use client";

import Link from "next/link";
import { ArrowLeft, Languages, Utensils, ShieldCheck, HeartHandshake, CloudRain, Volume2 } from "lucide-react";

export default function CultureGuidePage() {
    const playAudio = (text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border p-4 flex items-center gap-3 z-10">
                <Link href="/" className="p-2 -ml-2 hover:bg-stone-200/50 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div>
                    <h1 className="text-xl font-black text-foreground">Guide Culturel & Coutumes</h1>
                    <p className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">Us et coutumes de Chongqing</p>
                </div>
            </div>

            <div className="max-w-lg mx-auto p-4 space-y-5">
                {/* Intro */}
                <div className="card-imperial p-5">
                    <h2 className="text-xl font-black mb-1">Chongqing, la Ville Montagne</h2>
                    <p className="text-xs text-white/90 leading-relaxed">
                        Chongqing est intense, épicée et verticale. C'est une cité cyberpunk où les gens sont directs et chaleureux.
                    </p>
                </div>

                {/* Section: Language */}
                <section className="space-y-3">
                    <h3 className="text-sm font-black flex items-center gap-2 text-foreground">
                        <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                            <Languages className="w-4 h-4" />
                        </span>
                        Langue & Essentiels
                    </h3>
                    <div className="card-warm p-4 space-y-3">
                        <p className="text-xs text-muted-foreground">L'anglais est peu parlé. Voici les formules clés du quotidien.</p>
                        <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-stone-50 p-3 rounded-xl border border-border relative">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Bonjour</p>
                                <p className="font-black text-sm text-foreground">Ni hao (你好)</p>
                                <button
                                    type="button"
                                    onClick={() => playAudio("你好")}
                                    className="absolute top-2.5 right-2.5 p-1 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                >
                                    <Volume2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="bg-stone-50 p-3 rounded-xl border border-border relative">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Merci</p>
                                <p className="font-black text-sm text-foreground">Xie xie (谢谢)</p>
                                <button
                                    type="button"
                                    onClick={() => playAudio("谢谢")}
                                    className="absolute top-2.5 right-2.5 p-1 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                >
                                    <Volume2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="bg-stone-50 p-3 rounded-xl border border-border col-span-2 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Sans piment / Léger</p>
                                    <p className="font-black text-xs text-foreground hanzi">不要辣 (Bu yao la) / 微辣 (Wei la)</p>
                                </div>
                                <div className="flex gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => playAudio("不要辣")}
                                        className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                        title="Sans piment"
                                    >
                                        <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => playAudio("微辣")}
                                        className="p-1.5 bg-gold-light text-gold-dark rounded-lg hover:bg-gold hover:text-white transition-colors"
                                        title="Légèrement épicé"
                                    >
                                        <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Food Etiquette */}
                <section className="space-y-3">
                    <h3 className="text-sm font-black flex items-center gap-2 text-foreground">
                        <span className="p-1.5 bg-gold-light text-gold-dark rounded-lg">
                            <Utensils className="w-4 h-4" />
                        </span>
                        À Table
                    </h3>
                    <ul className="card-warm p-4 space-y-2.5 text-xs text-foreground">
                        <li className="flex gap-2.5">
                            <span className="text-destructive font-black">✗</span>
                            <span>Ne plantez jamais vos baguettes verticalement dans le bol de riz.</span>
                        </li>
                        <li className="flex gap-2.5">
                            <span className="text-emerald-600 font-black">✓</span>
                            <span>Les plats se partagent tous au milieu de la table.</span>
                        </li>
                        <li className="flex gap-2.5">
                            <span className="text-emerald-600 font-black">✓</span>
                            <span>Pour la fondue (Hotpot), laissez bien bouillir le bouillon avant d'y tremper vos aliments.</span>
                        </li>
                        <li className="flex gap-2.5">
                            <span className="text-gold font-black">!</span>
                            <span>Aucun pourboire en Chine. C'est mal vu et refusé systématiquement.</span>
                        </li>
                    </ul>
                </section>

                {/* Section: Social & Rencontres */}
                <section className="space-y-3">
                    <h3 className="text-sm font-black flex items-center gap-2 text-foreground">
                        <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                            <HeartHandshake className="w-4 h-4" />
                        </span>
                        Vie Sociale & Échanges
                    </h3>
                    <div className="card-warm p-4 space-y-3 text-xs text-foreground leading-relaxed">
                        <div>
                            <h4 className="font-black text-foreground mb-1">Le QR code WeChat (微信)</h4>
                            <p className="text-muted-foreground">
                                Personne n'échange de numéro de téléphone. Pour garder contact avec quelqu'un rencontré sur place, demandez simplement à scanner son WeChat.
                            </p>
                        </div>
                        <div className="bg-stone-50 p-3 rounded-xl border border-border flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">On s'ajoute sur WeChat ?</p>
                                <p className="font-black text-xs text-foreground hanzi">可以加个微信吗? (Kěyǐ jiā gè wēixìn ma?)</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => playAudio("可以加个微信吗?")}
                                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                            >
                                <Volume2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section: Sécurité & Climat */}
                <section className="space-y-3">
                    <h3 className="text-sm font-black flex items-center gap-2 text-foreground">
                        <span className="p-1.5 bg-stone-200 text-stone-700 rounded-lg">
                            <ShieldCheck className="w-4 h-4" />
                        </span>
                        Sécurité & Météo
                    </h3>
                    <div className="space-y-2">
                        <div className="card-warm p-3.5 flex gap-3 items-start">
                            <CloudRain className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-xs text-foreground">Climat Humide</h4>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                    Chongqing est souvent brumeuse et très humide. Prévoyez toujours un vêtement respirant et un petit parapluie.
                                </p>
                            </div>
                        </div>
                        <div className="card-warm p-3.5 flex gap-3 items-start">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-xs text-foreground">Sécurité Exemplaire</h4>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                    La ville est sécurisante même tard la nuit. Faites seulement attention aux scooters électriques qui roulent sans bruit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
