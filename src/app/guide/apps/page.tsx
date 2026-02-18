"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Map, Smartphone, Download, CarFront, Wifi } from "lucide-react";

export default function AppGuidePage() {
    const apps = [
        {
            name: "WeChat (Weixin)",
            icon: <MessageSquare className="w-8 h-8 text-green-500" />,
            desc: "L'application à tout faire. Messagerie, Paiements, Réservations. Indispensable.",
            link: "https://www.wechat.com/en/",
            color: "bg-green-50 text-green-700 border-green-200"
        },
        {
            name: "Alipay (Zhifubao)",
            icon: <Smartphone className="w-8 h-8 text-blue-500" />,
            desc: "Alternative de paiement majeure. Inclut 'TourPass' pour lier une carte étrangère.",
            link: "https://render.alipay.com/p/s/i?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20000056",
            color: "bg-blue-50 text-blue-700 border-blue-200"
        },
        {
            name: "Amap (Gaode Ditu)",
            icon: <Map className="w-8 h-8 text-amber-500" />,
            desc: "Le 'Google Maps' local. Google Maps ne fonctionne pas bien ici.",
            link: "https://www.amap.com/",
            color: "bg-amber-50 text-amber-700 border-amber-200"
        },
        {
            name: "Didi (Ride Hailing)",
            icon: <CarFront className="w-8 h-8 text-orange-500" />,
            desc: "L'équivalent d'Uber. Indispensable car les taxis sont difficiles à héler.",
            link: "https://web.didiglobal.com/en/",
            color: "bg-orange-50 text-orange-700 border-orange-200"
        },
        {
            name: "Trip.com",
            icon: <div className="w-8 h-8 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-xs">Trip</div>,
            desc: "Pour réserver trains et hôtels. Interface en français et service client top.",
            link: "https://www.trip.com/",
            color: "bg-blue-50 text-blue-700 border-blue-200"
        },
        {
            name: "Pleco",
            icon: <div className="w-8 h-8 rounded bg-slate-800 text-white font-serif flex items-center justify-center font-black text-lg">魚</div>,
            desc: "Le dictionnaire ultime. OCR pour lire les menus et écrire à la main.",
            link: "https://www.pleco.com/",
            color: "bg-slate-50 text-slate-700 border-slate-200"
        },
        {
            name: "MetroMan",
            icon: <div className="w-8 h-8 rounded bg-emerald-600 text-white font-bold flex items-center justify-center">M</div>,
            desc: "Carte du métro interactive (en anglais/français). Calcule les itinéraires.",
            link: "https://www.metroman.cn/en/",
            color: "bg-emerald-50 text-emerald-700 border-emerald-200"
        },
        {
            name: "Dazhong Dianping",
            icon: <div className="w-8 h-8 rounded bg-orange-500 text-white font-bold flex items-center justify-center">点</div>,
            desc: "Le 'Yelp/TripAdvisor' chinois. Pour trouver les meilleurs restos et avis.",
            link: "https://www.dianping.com/",
            color: "bg-orange-50 text-orange-700 border-orange-200"
        },
        {
            name: "LetsVPN / Astrill",
            icon: <Wifi className="w-8 h-8 text-purple-500" />,
            desc: "Crucial pour accéder à Google, Instagram, WhatsApp, etc. (Installer AVANT de partir)",
            link: "https://letsvpn.world/",
            color: "bg-purple-50 text-purple-700 border-purple-200"
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-4 flex items-center gap-4 z-10">
                <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-700" />
                </Link>
                <h1 className="text-xl font-bold text-slate-800">Apps Indispensables</h1>
            </div>

            <div className="max-w-xl mx-auto p-6 space-y-6">
                <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                    <h2 className="text-2xl font-black mb-2">Kit de Survie</h2>
                    <p className="text-indigo-100 opacity-90">Pour survivre en Chine, votre téléphone est votre meilleure arme. Installez ces apps avant de partir !</p>
                </div>

                <div className="space-y-4">
                    {apps.map((app) => (
                        <a
                            key={app.name}
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-5 rounded-2xl border-2 transition-all hover:scale-[1.02] hover:shadow-md ${app.color}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-xl shadow-sm shrink-0">
                                    {app.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        {app.name}
                                        <Download className="w-4 h-4 opacity-50" />
                                    </h3>
                                    <p className="text-sm opacity-80 mt-1 leading-relaxed">{app.desc}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-400 text-center">
                    Note: Un VPN est souvent nécessaire pour télécharger ou utiliser certaines apps occidentales, mais ces apps locales fonctionnent partout.
                </div>
            </div>
        </div>
    );
}
