import { AgendaView } from "@/components/agenda/AgendaView";

export default function AgendaPage() {
    return (
        <div className="min-h-screen p-4">
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Planning</h1>
            </header>

            <AgendaView />
        </div>
    );
}
