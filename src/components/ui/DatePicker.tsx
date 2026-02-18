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
        // 0 = Sunday, 1 = Monday... but we want Monday first for FR
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
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        // Format YYYY-MM-DD manually to avoid timezone shifts
        const yyyy = newDate.getFullYear();
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        onChange(`${yyyy}-${mm}-${dd}`);
        onClose();
    };

    const monthName = viewDate.toLocaleDateString('fr-FR', { month: 'long' });
    const yearNum = viewDate.getFullYear();
    const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

    const currentSelectedDate = new Date(value);
    const isSelected = (day: number) => {
        return currentSelectedDate.getDate() === day &&
            currentSelectedDate.getMonth() === viewDate.getMonth() &&
            currentSelectedDate.getFullYear() === viewDate.getFullYear();
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day &&
            today.getMonth() === viewDate.getMonth() &&
            today.getFullYear() === viewDate.getFullYear();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200 p-4">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">

                {/* Header Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Sélecteur
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex flex-col gap-2">
                        {/* Month Nav */}
                        <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-bold text-slate-800 dark:text-white capitalize flex-1 text-center">{monthName}</span>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Year Nav */}
                        <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
                            <button onClick={handlePrevYear} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-bold text-slate-800 dark:text-white flex-1 text-center font-mono">{yearNum}</span>
                            <button onClick={handleNextYear} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Week Days */}
                    <div className="grid grid-cols-7 mb-2 text-center">
                        {weekDays.map(day => (
                            <div key={day} className="text-[10px] font-black text-slate-300 uppercase py-2">
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
                                        "h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all relative",
                                        selected
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105 z-10"
                                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800",
                                        today && !selected && "text-indigo-600 font-bold bg-indigo-50/50"
                                    )}
                                >
                                    {day}
                                    {today && !selected && (
                                        <div className="absolute bottom-1.5 w-1 h-1 bg-indigo-500 rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex justify-center border-t border-slate-50 dark:border-slate-800 pt-4">
                        <button
                            onClick={() => {
                                const today = new Date();
                                const yyyy = today.getFullYear();
                                const mm = String(today.getMonth() + 1).padStart(2, '0');
                                const dd = String(today.getDate()).padStart(2, '0');
                                onChange(`${yyyy}-${mm}-${dd}`);
                                onClose();
                            }}
                            className="text-xs font-bold text-indigo-500 hover:text-indigo-700 px-4 py-2 hover:bg-indigo-50 rounded-full transition-colors uppercase tracking-wider"
                        >
                            Aujourd'hui
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
