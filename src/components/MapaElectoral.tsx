import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { elecciones } from "@/data/elecciones";
import { provinciasSvg, MAPA_VIEWBOX } from "@/data/mapa-argentina";
import { cn } from "@/lib/utils";

const COLORES = ["var(--party-1)", "var(--party-2)", "var(--party-3)", "var(--party-4)", "var(--party-5)"];

export function MapaElectoral() {
  const [eid, setEid] = useState(elecciones[0]!.id);
  const [sel, setSel] = useState<string | null>(null);
  const e = elecciones.find((x) => x.id === eid)!;
  const jur = (id: string) => e.jurisdicciones.find((j) => j.id === id);
  const color = (cid: string) => COLORES[e.candidatos.findIndex((c) => c.id === cid) % COLORES.length];
  const verificados = e.jurisdicciones.filter((j) => j.ganador?.verificado);
  const prov = sel ? provinciasSvg.find((p) => p.id === sel) : null;
  const jsel = sel ? jur(sel) : undefined;
  const nombreDe = (p: { id: string; nombre: string }) => (p.id === "C" ? "Capital Federal" : p.nombre);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] items-start">
      <div className="relative rounded-sm border border-border bg-card/70 p-3 shadow-[var(--shadow-ballot)]">
        <svg key={eid} viewBox={MAPA_VIEWBOX} className="mx-auto h-[460px] w-auto animate-fade-up" role="img" aria-label={`Mapa de Argentina, elección ${e.anio}`}>
          <defs>
            <pattern id="rayado" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5" stroke="var(--border)" strokeWidth="2" />
            </pattern>
          </defs>
          {provinciasSvg.map((p) => {
            const j = jur(p.id);
            const g = j?.ganador?.verificado ? j.ganador.valor : null;
            const fill = j?.estado === "territorio" ? "url(#rayado)" : g ? color(g) : "var(--map-pending)";
            return (
              <path key={p.id} d={p.d} fill={fill} stroke="var(--background)" strokeWidth={p.id === "C" ? 0.4 : 0.8}
                className={cn("cursor-pointer transition-[fill,opacity] duration-500 hover:opacity-80 focus:outline-none", sel === p.id && "stroke-primary")}
                style={sel === p.id ? { stroke: "var(--primary)", strokeWidth: 2 } : undefined}
                tabIndex={0} role="button" aria-label={nombreDe(p)}
                onClick={() => setSel(p.id)} onKeyDown={(ev) => ev.key === "Enter" && setSel(p.id)}>
                <title>{nombreDe(p)}</title>
              </path>
            );
          })}
        </svg>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">Límites provinciales actuales · Natural Earth (dominio público)</p>
      </div>

      <div className="space-y-5 text-sm">
        <div>
          <label className="eyebrow" htmlFor="sel-eleccion">Elección</label>
          <select id="sel-eleccion" value={eid} onChange={(ev) => { setEid(ev.target.value); setSel(null); }}
            className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 font-display text-lg text-primary">
            {elecciones.map((x) => <option key={x.id} value={x.id}>{x.anio}</option>)}
          </select>
        </div>

        <div className="rounded-sm border border-border bg-card p-3 min-h-28">
          {prov ? (
            <>
              <div className="font-display text-lg text-primary">{nombreDe(prov)}</div>
              {jsel?.estado === "territorio" ? (
                <p className="mt-1 text-muted-foreground">Territorio nacional: sus habitantes no votaban para presidente en {e.anio}.</p>
              ) : jsel?.ganador?.verificado ? (
                <p className="mt-1">Ganó: {e.candidatos.find((c) => c.id === jsel.ganador!.valor)?.nombre}</p>
              ) : (
                <p className="mt-1"><span className="rounded-sm bg-warning px-1.5 py-0.5 text-xs text-warning-foreground">Pendiente de verificación</span><br /><span className="text-muted-foreground">Votó en {e.anio}. Todavía no cargamos su resultado distrital con fuente confirmada.</span></p>
              )}
            </>
          ) : <p className="text-muted-foreground">Tocá una provincia para ver sus datos.</p>}
        </div>

        <ul className="space-y-1.5">
          {verificados.length > 0 && e.candidatos.map((c) => (
            <li key={c.id} className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: color(c.id) }} />{c.nombre}</li>
          ))}
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[var(--map-pending)]" />Votó · resultado distrital pendiente</li>
          <li className="flex items-center gap-2"><svg className="h-3 w-3"><rect width="12" height="12" fill="url(#rayado)" stroke="var(--border)" /></svg>Territorio nacional (no votaba)</li>
        </ul>

        {verificados.length === 0 && (
          <p className="rounded-sm border-l-2 border-celeste bg-secondary p-2 text-xs text-muted-foreground">
            Todavía no hay resultados por provincia verificados para {e.anio}, así que no coloreamos ganadores: preferimos no mostrar datos sin confirmar.
          </p>
        )}
        <p className="text-xs text-muted-foreground">{e.notaMapa}</p>
        <Link to="/eleccion/$anio" params={{ anio: e.id }} className="inline-block text-primary underline underline-offset-4">Ver candidatos de {e.anio} →</Link>
      </div>
    </div>
  );
}
