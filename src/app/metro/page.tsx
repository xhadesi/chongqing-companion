"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize, Map as MapIcon, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MetroPage() {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const newScale = Math.min(Math.max(0.5, scale - e.deltaY * 0.001), 4);
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    // Touch Support
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.touches.length === 1) {
            setPosition({ x: e.touches[0].clientX - startPos.x, y: e.touches[0].clientY - startPos.y });
        }
    };

    const handleTouchEnd = () => setIsDragging(false);

    return (
        <div className="h-screen bg-slate-900 overflow-hidden relative flex flex-col">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-white font-black text-2xl drop-shadow-md">Métro Chongqing</h1>
                        <p className="text-white/70 text-xs">Carte Hors-ligne</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
                <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-xl active:scale-95">
                    <ZoomIn className="w-6 h-6" />
                </button>
                <button onClick={() => setScale(s => Math.max(0.5, s - 0.5))} className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-xl active:scale-95">
                    <ZoomOut className="w-6 h-6" />
                </button>
                <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }} className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-xl active:scale-95">
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {/* Map Container */}
            <div
                className="flex-1 cursor-grab active:cursor-grabbing relative bg-slate-950 flex items-center justify-center overflow-hidden"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* 
                  PLACEHOLDER: In a real scenario, we would use a high-res JPG/SVG here.
                  For now, we use a placeholder or potentially generate one.
                  I'll use a placeholder div that simulates the map.
                */}
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                    className="relative w-[1200px] h-[1200px] bg-slate-800 flex items-center justify-center border-4 border-slate-700 rounded-xl"
                >
                    <div className="text-center opacity-50">
                        <MapIcon className="w-32 h-32 mx-auto text-slate-600 mb-4" />
                        <h2 className="text-4xl font-bold text-slate-500">Carte du Métro</h2>
                        <p className="text-slate-600 mt-2">Image non chargée</p>
                    </div>

                    {/* Simulating lines */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <svg className="w-full h-full">
                            <path d="M100,600 C300,600 400,400 600,600 S900,800 1100,600" stroke="#ef4444" strokeWidth="10" fill="none" />
                            <path d="M600,100 L600,1100" stroke="#3b82f6" strokeWidth="10" fill="none" />
                            <path d="M200,200 L1000,1000" stroke="#22c55e" strokeWidth="10" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
