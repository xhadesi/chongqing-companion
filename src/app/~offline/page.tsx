import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-6">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <WifiOff className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Mode Hors-Ligne</h1>
        <p className="text-muted-foreground text-lg">
          Vous êtes hors-ligne et cette page n'a pas encore été mise en cache. 
          Mais pas de panique, vos ressources préalablement visitées sont sauvegardées !
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm">
        <Link href="/" className="px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex-1 active:scale-95 transition-transform text-center shadow-md">
          Aller à l'Accueil
        </Link>
        <Link href="/agenda" className="px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold flex-1 active:scale-95 transition-transform text-center shadow-md">
          Mon Agenda
        </Link>
      </div>
    </div>
  );
}
