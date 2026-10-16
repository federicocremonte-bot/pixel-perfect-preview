import type { Candidato } from "@/data/elecciones";
import { cn } from "@/lib/utils";

// Estilo visual por época. Son recreaciones inspiradas en el período, no reproducciones de boletas originales.
export type Era = "1910" | "moderna";
export const eraDe = (anio: number): Era => (anio < 1940 ? "1910" : "moderna");

export function Boleta({
  c, anio, selected, onSelect, className,
}: { c: Candidato; anio: number; selected?: boolean; onSelect?: () => void; className?: string }) {
  const era = eraDe(anio);
  if (era === "1910") {
    return (
      <button type="button" onClick={onSelect} aria-pressed={selected} aria-label={`Boleta de ${c.partido}: ${c.nombre} y ${c.formula}`}
        className={cn("ballot ballot-1910 relative w-full p-2 rounded-[2px] cursor-pointer text-center", selected && "ballot-active", className)}>
        <div className="border-[3px] border-double border-ink/70 p-4">
          <div className="flex items-center justify-center gap-2 text-ink/60">
            <span className="h-px flex-1 bg-ink/40" />
            <span className="font-display text-[10px] tracking-[0.35em]">✦ {anio} ✦</span>
            <span className="h-px flex-1 bg-ink/40" />
          </div>
          <div className="mt-3 font-display text-xl font-semibold uppercase leading-tight tracking-wide text-ink">{c.partido}</div>
          <div className="mt-1 font-display text-xs italic text-ink/70">Electores de Presidente y Vice-Presidente de la Nación</div>
          <div className="my-3 h-[3px] border-y border-ink/50" />
          <div className="font-display text-[10px] uppercase tracking-[0.3em] text-ink/60">Para Presidente</div>
          <div className="font-display text-lg uppercase text-ink">{c.nombre}</div>
          <div className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-ink/60">Para Vice-Presidente</div>
          <div className="font-display text-sm uppercase text-ink">{c.formula}</div>
          <div className="mt-3 flex items-center justify-between text-[9px] text-ink/50">
            <span>Recreación de época</span>
            <span className={cn("h-4 w-4 rounded-full border-2 border-ink/70", selected && "bg-primary border-primary")} />
          </div>
        </div>
      </button>
    );
  }
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected}
      className={cn("ballot relative w-full text-left p-5 rounded-sm cursor-pointer", selected && "ballot-active", className)}>
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="eyebrow">Elección presidencial {anio}</span>
        <span className={cn("h-4 w-4 rounded-full border-2 border-primary", selected && "bg-primary")} />
      </div>
      <div className="py-5 text-center">
        <div className="font-mono text-xs tracking-[0.3em] text-muted-foreground">{c.sigla}</div>
        <div className="mt-1 font-display text-lg uppercase leading-tight text-primary">{c.partido}</div>
      </div>
      <div className="rule-double pt-3 text-center">
        <div className="eyebrow">Presidente</div>
        <div className="font-display text-xl">{c.nombre}</div>
        <div className="eyebrow mt-2">Vicepresidente</div>
        <div className="text-sm">{c.formula}</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-celeste/60" />
    </button>
  );
}

export function Urna({ anio }: { anio: number }) {
  if (eraDe(anio) === "1910") {
    return (
      <div className="urna-madera absolute bottom-0 left-1/2 h-36 w-56 -translate-x-1/2 rounded-[3px] z-10">
        <div className="mx-auto mt-2 h-1.5 w-28 rounded-full bg-ink/80" />
        <div className="mx-4 mt-6 border border-paper/30 py-2 text-center">
          <div className="font-display text-sm uppercase tracking-[0.3em] text-paper">Urna</div>
          <div className="text-[10px] uppercase tracking-widest text-paper/70">Elección {anio}</div>
        </div>
        <div className="absolute -bottom-2 left-3 h-2 w-4 bg-ink/70" /><div className="absolute -bottom-2 right-3 h-2 w-4 bg-ink/70" />
      </div>
    );
  }
  return (
    <div className="absolute bottom-0 left-1/2 h-36 w-56 -translate-x-1/2 border-2 border-primary bg-card z-10">
      <div className="mx-auto -mt-1 h-2 w-28 bg-primary" />
      <div className="mt-8 text-center font-display text-primary">URNA</div>
      <div className="eyebrow text-center mt-1">Nación Argentina</div>
    </div>
  );
}
