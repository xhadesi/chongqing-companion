"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Map, Smartphone, Download, CarFront, Wifi } from "lucide-react";

export default function AppGuidePage() {
    const apps = [
        {
            name: "WeChat (Weixin)",
            icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
            desc: "L'application à tout faire. Messagerie, paiements, réservations. Indispensable.",
            link: "https://www.wechat.com/en/"
        },
        {
            name: "Alipay (Zhifubao)",
            icon: <Smartphone className="w-6 h-6 text-sky-600" />,
            desc: "Alternative de paiement majeure. Inclut le paiement direct par carte étrangère.",
            link: "https://render.alipay.com/p/s/i?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20000056"
        },
        {
            name: "Amap (Gaode Ditu)",
            icon: <Map className="w-6 h-6 text-gold" />,
            desc: "La cartographie la plus précise en Chine. Google Maps ne fonctionne pas bien sur place.",
            link: "https://www.amap.com/"
        },
        {
            name: "DiDi (VTC / Chauffeur)",
            icon: <CarFront className="w-6 h-6 text-primary" />,
            desc: "Commandez vos trajets directement depuis l'application avec traduction automatique.",
            link: "https://web.didiglobal.com/en/"
        },
        {
            name: "Trip.com",
            icon: <div className="w-6 h-6 rounded bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">Trip</div>,
            desc: "Idéal pour réserver trains chinois, hôtels et billets de musées en français.",
            link: "https://www.trip.com/"
        },
        {
            name: "Pleco",
            icon: <div className="w-6 h-6 rounded bg-stone-800 text-white font-serif flex items-center justify-center font-bold text-sm hanzi">魚</div>,
            desc: "Dictionnaire hors ligne avec reconnaissance optique des caractères chinois.",
            link: "https://www.pleco.com/"
        },
        {
            name: "MetroMan",
            icon: <div className="w-6 h-6 rounded bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">M</div>,
            desc: "Plan du métro de Chongqing hors ligne avec calcul de trajet et tarifs.",
            link: "https://www.metroman.cn/en/"
        },
        {
            name: "LetsVPN / Astrill",
            icon: <Wifi className="w-6 h-6 text-indigo-600" />,
            desc: "VPN à installer impérativement avant d'atterrir en Chine.",
            link: "https://letsvpn.world/"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border p-4 flex items-center gap-3 z-10">
                <Link href="/" className="p-2 -ml-2 hover:bg-stone-200/50 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div>
                    <h1 className="text-xl font-black text-foreground">Applications Essentielles</h1>
                    <p className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">Guide d'installation</p>
                </div>
            </div>

            <div className="max-w-lg mx-auto p-4 space-y-4">
                <div className="card-imperial p-5">
                    <h2 className="text-lg font-black text-white mb-1">Kit Téléphone Chine</h2>
                    <p className="text-xs text-white/90 leading-relaxed">
                        Installez ces applications et configurez vos cartes bancaires sur Alipay et WeChat avant de partir.
                    </p>
                </div>

                <div className="space-y-3">
                    {apps.map((app) => (
                        <a
                            key={app.name}
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-warm p-4 block hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-stone-100 shrink-0">
                                    {app.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-black text-foreground flex items-center gap-1.5">
                                        {app.name}
                                        <Download className="w-3.5 h-3.5 text-muted-foreground opacity-60" />
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{app.desc}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="card-warm p-4 text-xs text-muted-foreground text-center bg-stone-50">
                    Pour WeChat et Alipay, vérifiez votre pièce d'identité en avance afin d'activer les paiements sans blocage.
                </div>
            </div>
        </div>
    );
}
