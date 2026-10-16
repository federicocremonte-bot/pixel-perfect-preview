import type { Candidato } from "@/data/elecciones";
import { cn } from "@/lib/utils";

export function Boleta({
  c, anio, selected, onSelect, className,
}: { c: Candidato; anio: number; selected?: boolean; onSelect?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn("ballot relative w-full text-left p-5 rounded-sm cursor-pointer", selected && "ballot-active", className)}
    >
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
