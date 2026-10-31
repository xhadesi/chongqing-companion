"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    value: string; // YYYY-MM-DD
    onChange: (date: string) => void;
    onClose: () => void;
}

export function DatePicker({ value, onChange, onClose }: DatePickerProps) {
    const [viewDate, setViewDate] = useState(() => {
        const d = new Date(value);
        return isNaN(d.getTime()) ? new Date() : d;
    });

    const daysInMonth = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }, [viewDate]);

    const firstDayOfMonth = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    }, [viewDate]);

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handlePrevYear = () => {
        setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
    };

    const handleNextYear = () => {
        setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
    };

    const handleSelectDay = (day: number) => {
        const yyyy = viewDate.getFullYear();
        const mm = String(viewDate.getMonth() + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        onChange(`${yyyy}-${mm}-${dd}`);
        onClose();
    };

    const monthName = viewDate.toLocaleDateString("fr-FR", { month: "long" });
    const yearNum = viewDate.getFullYear();
    const weekDays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

    const currentSelectedDate = new Date(value);
    const isSelected = (day: number) => {
        return (
            currentSelectedDate.getDate() === day &&
            currentSelectedDate.getMonth() === viewDate.getMonth() &&
            currentSelectedDate.getFullYear() === viewDate.getFullYear()
        );
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === viewDate.getMonth() &&
            today.getFullYear() === viewDate.getFullYear()
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-border z-10">
                {/* Header Section */}
                <div className="shrink-0 bg-stone-50 p-4 border-b border-border">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            Choisir une date
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-stone-200 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex flex-col gap-2">
                        {/* Month Nav */}
                        <div className="flex items-center justify-between bg-white rounded-xl p-1 shadow-sm border border-border">
                            <button
                                onClick={handlePrevMonth}
                                className="p-1.5 hover:bg-stone-100 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-xs text-foreground capitalize flex-1 text-center">
                                {monthName}
                            </span>
                            <button
                                onClick={handleNextMonth}
                                className="p-1.5 hover:bg-stone-100 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Year Nav */}
                        <div className="flex items-center justify-between bg-white rounded-xl p-1 shadow-sm border border-border">
                            <button
                                onClick={handlePrevYear}
                                className="p-1.5 hover:bg-stone-100 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-xs text-foreground flex-1 text-center">
                                {yearNum}
                            </span>
                            <button
                                onClick={handleNextYear}
                                className="p-1.5 hover:bg-stone-100 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar">
                    {/* Week Days */}
                    <div className="grid grid-cols-7 mb-2 text-center">
                        {weekDays.map((day) => (
                            <div key={day} className="text-[10px] font-black text-muted-foreground uppercase py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const selected = isSelected(day);
                            const today = isToday(day);

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleSelectDay(day)}
                                    className={cn(
                                        "h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-all relative",
                                        selected
                                            ? "bg-primary text-white font-black shadow-sm scale-105 z-10"
                                            : "text-foreground hover:bg-stone-100",
                                        today && !selected && "text-gold-dark font-black bg-gold-light border border-gold/40"
                                    )}
                                >
                                    {day}
                                    {today && !selected && (
                                        <div className="absolute bottom-1 w-1 h-1 bg-gold rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex justify-center border-t border-border pt-3">
                        <button
                            type="button"
                            onClick={() => {
                                const today = new Date();
                                const yyyy = today.getFullYear();
                                const mm = String(today.getMonth() + 1).padStart(2, "0");
                                const dd = String(today.getDate()).padStart(2, "0");
                                onChange(`${yyyy}-${mm}-${dd}`);
                                onClose();
                            }}
                            className="text-xs font-bold text-primary hover:text-primary/80 px-4 py-2 hover:bg-primary/5 rounded-full transition-colors uppercase tracking-wider"
                        >
                            Aujourd'hui
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
