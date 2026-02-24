"use client";

import Link from "next/link";
import { ArrowLeft, Languages, Utensils, ShieldCheck, HeartHandshake, CloudRain, Volume2 } from "lucide-react";

export default function CultureGuidePage() {
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
        <div className="min-h-screen bg-white pb-32">
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
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative group">
                                <p className="text-xs text-slate-400">Bonjour</p>
                                <p className="font-bold text-slate-800">Ni hao (你好)</p>
                                <button onClick={() => playAudio('你好')} className="absolute top-3 right-3 p-1.5 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors">
                                    <Volume2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative group">
                                <p className="text-xs text-slate-400">Merci</p>
                                <p className="font-bold text-slate-800">Xie xie (谢谢)</p>
                                <button onClick={() => playAudio('谢谢')} className="absolute top-3 right-3 p-1.5 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors">
                                    <Volume2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm col-span-2 relative group flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-slate-400">Je ne veux pas épicé (Crucial !)</p>
                                    <p className="font-bold text-slate-800">Bu yao la (不要辣) / Wei la (微辣)</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => playAudio('不要辣')} className="p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors" title="Pas épicé">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => playAudio('微辣')} className="p-1.5 bg-amber-50 text-amber-500 rounded-full hover:bg-amber-100 transition-colors" title="Légèrement épicé">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
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

                {/* Section: Social & Rencontres (Drague / Expat) */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <span className="p-2 bg-pink-100 text-pink-600 rounded-xl"><HeartHandshake className="w-5 h-5" /></span>
                        Rencontre, Drague & Social
                    </h3>
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-5 text-sm text-slate-700">

                        <div>
                            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">L'Avantage du Laowai (Étranger)</h4>
                            <p>En tant que Français blond aux yeux bleus, tu corresponds à 100% au standard de beauté occidental recherché ici. Tu vas attirer les regards. Les filles seront souvent intimidées de t'aborder en premier par peur que leur anglais soit mauvais. <strong>C'est à toi de faire le premier pas, toujours avec le sourire.</strong></p>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">Les 3 règles d'or de l'approche</h4>
                            <ul className="space-y-2">
                                <li><span className="text-pink-500 font-bold">1. Le WeChat (微信) :</span> C'est la base absolue. On ne demande <strong>jamais</strong> un numéro de téléphone, on demande à s'ajouter sur WeChat. C'est l'étape 1 de toute relation (amicale ou amoureuse).</li>
                                <li><span className="text-pink-500 font-bold">2. L'approche indirecte :</span> Dans les lieux calmes (parcs, cafés), demande de l'aide ou pose une question simple (ex: "Peux-tu me prendre en photo ?"). C'est moins agressif qu'un compliment frontal.</li>
                                <li><span className="text-pink-500 font-bold">3. L'approche directe (Clubs/Bars) :</span> En soirée (Nine Street), tu peux y aller frontalement. Les filles sont là pour s'amuser et sociabiliser. Le contact visuel prolongé suivi d'un sourire est un feu vert.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Phrases de Survie (Icebreakers)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm relative group">
                                    <p className="text-[11px] uppercase tracking-wider text-pink-500 font-bold mb-1">La base absolue</p>
                                    <p className="text-xs text-slate-400">On peut s'ajouter sur WeChat ?</p>
                                    <p className="font-bold text-slate-800">Kěyǐ jiā gè wēixìn ma? (可以加个微信吗?)</p>
                                    <button onClick={() => playAudio('可以加个微信吗?')} className="absolute top-3 right-3 p-1.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm relative group">
                                    <p className="text-[11px] uppercase tracking-wider text-pink-500 font-bold mb-1">Le compliment direct</p>
                                    <p className="text-xs text-slate-400">Tu es très jolie !</p>
                                    <p className="font-bold text-slate-800">Nǐ hěn piàoliang! (你很漂亮!)</p>
                                    <button onClick={() => playAudio('你很漂亮!')} className="absolute top-3 right-3 p-1.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm relative group">
                                    <p className="text-[11px] uppercase tracking-wider text-pink-500 font-bold mb-1">L'approche indirecte</p>
                                    <p className="text-xs text-slate-400">Tu as un super style.</p>
                                    <p className="font-bold text-slate-800">Nǐ de yīfú hěn hǎokàn (你的衣服很好看)</p>
                                    <button onClick={() => playAudio('你的衣服很好看')} className="absolute top-3 right-3 p-1.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm relative group">
                                    <p className="text-[11px] uppercase tracking-wider text-pink-500 font-bold mb-1">Pour inviter</p>
                                    <p className="text-xs text-slate-400">Puis-je t'offrir un verre ?</p>
                                    <p className="font-bold text-slate-800">Wǒ qǐng nǐ hē yībēi? (我请你喝一杯?)</p>
                                    <button onClick={() => playAudio('我请你喝一杯?')} className="absolute top-3 right-3 p-1.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm col-span-1 md:col-span-2 flex flex-col items-center text-center relative group">
                                    <p className="text-[11px] uppercase tracking-wider text-pink-500 font-bold mb-1">Si elle sourit et valide, sors direct :</p>
                                    <p className="text-xs text-slate-400">Je scanne ton QR code ?</p>
                                    <p className="font-bold text-slate-800">Wǒ sǎo nǐ? (我扫你?)</p>
                                    <span className="text-[10px] text-slate-400 mt-1">(Prépare ton WeChat ouvert sur Scanner)</span>
                                    <button onClick={() => playAudio('我扫你?')} className="absolute top-3 right-3 md:top-auto md:bottom-3 md:right-3 p-1.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">Les Dates & Le Comportement</h4>
                            <p className="mb-2"><strong>Le paiement :</strong> En Chine, l'homme paie <strong>toujours</strong> lors des premiers dates. Ne propose jamais de faire 50/50, c'est très mal vu et perçu comme un manque de virilité ou de politesse.</p>
                            <p className="mb-2"><strong>La "Face" (Mianzi) :</strong> Ne mets jamais quelqu'un mal à l'aise en public. Si une fille refuse ton WeChat poliment (souvent en disant qu'elle n'accepte pas les inconnus), réponds simplement "Méi guānxì" (Pas de problème) et pars avec le sourire.</p>
                            <p><strong>L'Anglais :</strong> Utilise un anglais très simple, parle doucement. N'hésite pas à utiliser l'application de traduction de ton téléphone si vous coincez sur un sujet. C'est tout à fait normal et très utilisé pour les dates avec des étrangers.</p>
                        </div>
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
