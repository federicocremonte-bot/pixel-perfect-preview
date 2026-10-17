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
    const col = c.boleta?.color;
    const ink = col ?? "var(--ink)";
    return (
      <button type="button" onClick={onSelect} aria-pressed={selected} aria-label={`Boleta de ${c.partido}: ${c.nombre} y ${c.formula}`}
        title={c.boleta?.notaColor}
        className={cn("group relative w-full cursor-pointer text-center transition-transform duration-300", selected ? "-translate-y-1.5" : "hover:-translate-y-0.5", className)}
        style={{ filter: selected ? "drop-shadow(0 0 0 var(--primary)) drop-shadow(0 18px 22px oklch(0.2 0.08 262 / 0.55))" : "drop-shadow(0 10px 14px oklch(0.2 0.06 262 / 0.35))" }}>
        <div className="papel-1916 px-4 pt-5 pb-4 text-ink">
          {col ? (
            <div className="mx-auto mb-3 flex h-3 w-full overflow-hidden">
              <span className="flex-1" style={{ background: col }} />
              <span className="flex-1" style={{ background: c.boleta?.colorSecundario ?? "transparent" }} />
              <span className="flex-1" style={{ background: col }} />
            </div>
          ) : <div className="mb-3 h-[3px] border-y border-ink/70" />}
          <div className="font-display text-[9px] tracking-[0.4em] text-ink/70">— ELECCIÓN DE {anio} —</div>
          <div className="tinta-1916 mt-2 font-display text-[1.35rem] font-black uppercase leading-[1.05] tracking-tight" style={{ color: ink }}>{c.partido}</div>
          <div className="mx-auto my-2 w-16 border-t border-ink/60" />
          <div className="font-display text-[11px] italic leading-snug text-ink/80">Lista de Electores de<br />Presidente y Vice-Presidente<br />de la Nación</div>
          <div className="my-3 flex items-center gap-2 text-ink/50"><span className="h-px flex-1 bg-current" /><span className="text-[9px]">❦</span><span className="h-px flex-1 bg-current" /></div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-ink/60">Candidato a Presidente</div>
          <div className="tinta-1916 font-display text-lg font-semibold uppercase leading-tight">{c.nombre}</div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.3em] text-ink/60">Candidato a Vice-Presidente</div>
          <div className="tinta-1916 font-display text-sm uppercase">{c.formula}</div>
          <div className="mt-4 border-t border-dashed border-ink/40 pt-2 flex items-center justify-between text-[9px] text-ink/55">
            <span>Recreación documentada · no es facsímil</span>
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
