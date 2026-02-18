"use client";

import Link from "next/link";
import { ArrowLeft, Languages, Utensils, ShieldCheck, HeartHandshake, CloudRain } from "lucide-react";

export default function CultureGuidePage() {
    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-4 flex items-center gap-4 z-10">
                <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-700" />
                </Link>
                <h1 className="text-xl font-bold text-slate-800">Guide Culturel & Expat</h1>
            </div>

            <div className="max-w-2xl mx-auto p-6 space-y-8">

                {/* Intro */}
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white shadow-lg shadow-rose-200">
                    <h2 className="text-2xl font-black mb-3">Chongqing, la Ville Montagne</h2>
                    <p className="text-rose-50 opacity-90 leading-relaxed">
                        Chongqing est intense, bruyante, épicée et verticale. C'est une ville cyberpunk où les gens sont chaleureux et directs. Voici ce qu'il faut savoir pour ne pas faire de faux pas.
                    </p>
                </div>

                {/* Section: Language */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <span className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Languages className="w-5 h-5" /></span>
                        Langue & Survie
                    </h3>
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                        <p className="text-sm text-slate-600">L'anglais est très peu parlé. Le dialecte local (Chongqinghua) est différent du Mandarin.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <p className="text-xs text-slate-400">Bonjour</p>
                                <p className="font-bold text-slate-800">Ni hao (你好)</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <p className="text-xs text-slate-400">Merci</p>
                                <p className="font-bold text-slate-800">Xie xie (谢谢)</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm col-span-2">
                                <p className="text-xs text-slate-400">Je ne veux pas épicé (Crucial !)</p>
                                <p className="font-bold text-slate-800">Bu yao la (不要辣) / Wei la (微辣 - un peu épicé)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Food Etiquette */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <span className="p-2 bg-amber-100 text-amber-600 rounded-xl"><Utensils className="w-5 h-5" /></span>
                        À Table
                    </h3>
                    <ul className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3 text-sm text-slate-700">
                        <li className="flex gap-3">
                            <span className="text-red-500 font-bold">✗</span>
                            <span>Ne plantez jamais vos baguettes verticalement dans le riz (signe de mort).</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>On partage tout. Les plats sont au centre.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Pour le Hotpot, attendez que ça bout. "Canard" (intestins) et Sang de canard sont des délices locaux, essayez !</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-amber-500 font-bold">!</span>
                            <span>Aucun pourboire. Jamais. C'est même offensant parfois.</span>
                        </li>
                    </ul>
                </section>

                {/* Section: Social */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <span className="p-2 bg-purple-100 text-purple-600 rounded-xl"><HeartHandshake className="w-5 h-5" /></span>
                        Social & Mœurs
                    </h3>
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3 text-sm text-slate-700">
                        <p>Les habitants de Chongqing sont connus pour être bruyants et passionnés ("Huo La" - chaud et épicé comme leur cuisine).</p>
                        <p><strong className="text-slate-900">Espace personnel :</strong> Il est réduit. On vous poussera peut-être dans le métro. Ce n'est pas agressif, juste pratique.</p>
                        <p><strong className="text-slate-900">Photos :</strong> On vous prendra en photo si vous êtes étranger. Souriez, c'est de la curiosité.</p>
                    </div>
                </section>

                {/* Section: Practical */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <span className="p-2 bg-slate-200 text-slate-600 rounded-xl"><ShieldCheck className="w-5 h-5" /></span>
                        Sécurité & Pratique
                    </h3>
                    <div className="space-y-3">
                        <div className="flex gap-3 items-start p-3 bg-white border border-slate-100 rounded-xl">
                            <CloudRain className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm">Météo</h4>
                                <p className="text-xs text-slate-500 mt-1">Chongqing est un "Four". En été (Juillet-Août), il fait 40°C+ et humide. Hiver doux mais gris et humide (pas de chauffage central au sud ! Prenez des vêtements chauds d'intérieur).</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start p-3 bg-white border border-slate-100 rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm">Sécurité</h4>
                                <p className="text-xs text-slate-500 mt-1">Ville extrêmement sûre, même la nuit. Les caméras sont partout. Attention juste à la circulation, les scooters sont silencieux.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
