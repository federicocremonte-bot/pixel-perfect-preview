import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-lg text-primary">
            Archivo <span className="italic">del Voto</span>
          </Link>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            <Link to="/recorrido" activeProps={{ className: "text-primary" }}>Recorrido</Link>
            <Link to="/perfil" activeProps={{ className: "text-primary" }}>Tu perfil</Link>
            <Link to="/sobre" activeProps={{ className: "text-primary" }}>Fuentes</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border mt-20">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>Simulación histórica educativa. Tu voto no modifica resultados oficiales.</span>
          <span className="eyebrow">Argentina · 1916 — hoy</span>
        </div>
      </footer>
    </div>
  );
}

export function Pendiente() {
  return (
    <span className="ml-2 inline-block rounded-sm bg-warning px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-warning-foreground">
      Pendiente de verificación
    </span>
  );
}
