import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFrame, Pendiente } from "@/components/SiteFrame";
import { Boleta } from "@/components/Boleta";
import { elecciones, getEleccion, type Candidato, type Eleccion } from "@/data/elecciones";
import { getConsent, getConteos, getVotos, registrarVotoAnonimo, saveVoto, setConsent, type Consent } from "@/lib/votes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eleccion/$anio")({
  loader: ({ params }) => {
    const e = getEleccion(params.anio);
    if (!e) throw notFound();
    return { id: e.id };
  },
  head: ({ loaderData }) => {
    const e = loaderData ? getEleccion(loaderData.id) : undefined;
    const t = e ? `Elección ${e.anio}: ${e.titulo} — Archivo del Voto` : "Elección no disponible";
    const d = e ? `Contexto, candidatos y boletas de la elección presidencial argentina de ${e.anio}. Votá y compará con el resultado real.` : "Elección no disponible.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  component: Page,
});

type Fase = "ficha" | "deposito" | "resultados";

function Page() {
  const { id } = Route.useLoaderData();
  const e = getEleccion(id)!;
  const idx = elecciones.findIndex((x) => x.id === id);
  const [fase, setFase] = useState<Fase>("ficha");
  const [sel, setSel] = useState<string | null>(null);
  const [voto, setVoto] = useState<string | null>(null);
  const [consent, setC] = useState<Consent>(null);
  const [pedirConsent, setPedir] = useState(false);

  useEffect(() => {
    setC(getConsent());
    const v = getVotos()[id];
    if (v) { setVoto(v); setSel(v); setFase("resultados"); }
  }, [id]);

  const confirmar = async (c: Consent) => {
    if (!sel) return;
    if (c === null) { setPedir(true); return; }
    setPedir(false);
    saveVoto(id, sel);
    setVoto(sel);
    setFase("deposito");
    if (c === "si") await registrarVotoAnonimo(id, sel);
    setTimeout(() => setFase("resultados"), 1700);
  };

  const elegido = e.candidatos.find((c) => c.id === sel);

  return (
    <SiteFrame>
      <div className="border-b border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between text-sm">
          <Link to="/recorrido" className="text-muted-foreground hover:text-primary">← Cronología</Link>
          <span className="eyebrow">Elección {idx + 1} de {elecciones.length} disponibles · {e.anio}</span>
        </div>
        <div className="h-0.5 bg-border"><div className="h-full bg-celeste" style={{ width: `${((idx + (voto ? 1 : 0)) / elecciones.length) * 100}%` }} /></div>
      </div>

      {fase === "deposito" && elegido && <Deposito c={elegido} anio={e.anio} />}
      {fase === "ficha" && (
        <div className="mx-auto max-w-6xl px-5 py-12 animate-fade-up">
          <Ficha e={e} />
          <section className="mt-16">
            <p className="eyebrow">Cuarto oscuro</p>
            <h2 className="mt-2 text-3xl text-primary">Elegí tu boleta</h2>
            <p className="mt-2 text-sm text-muted-foreground">Simulación histórica: tu voto no modifica el resultado oficial de {e.anio}.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {e.candidatos.map((c) => <Boleta key={c.id} c={c} anio={e.anio} selected={sel === c.id} onSelect={() => setSel(c.id)} />)}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button disabled={!sel} onClick={() => confirmar(consent)}
                className="rounded-sm bg-primary px-6 py-3 text-primary-foreground disabled:opacity-40 hover:bg-primary/90">
                {elegido ? `Confirmar voto por ${elegido.nombre}` : "Seleccioná una boleta"}
              </button>
              {sel && <a href="#candidatos" className="text-sm text-primary underline underline-offset-4">Volver a leer las fichas</a>}
            </div>
            {pedirConsent && (
              <div className="mt-6 max-w-xl border border-border bg-card p-5 animate-fade-up">
                <h3 className="text-xl text-primary">¿Sumamos tu voto a las estadísticas?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Solo se suma +1 al contador anónimo del candidato. No guardamos quién sos ni tu historial. Tu perfil se calcula únicamente en este dispositivo.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground" onClick={() => { setConsent("si"); setC("si"); confirmar("si"); }}>Sí, sumar de forma anónima</button>
                  <button className="rounded-sm border border-border px-4 py-2 text-sm" onClick={() => { setConsent("no"); setC("no"); confirmar("no"); }}>No, solo jugar</button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
      {fase === "resultados" && voto && <Resultados e={e} voto={voto} onRevisar={() => setFase("ficha")} />}
    </SiteFrame>
  );
}

function Ficha({ e }: { e: Eleccion }) {
  return (
    <>
      <p className="eyebrow">Elección presidencial</p>
      <div className="mt-2 flex flex-wrap items-end gap-6">
        <span className="font-display text-7xl sm:text-8xl text-primary leading-none">{e.anio}</span>
        <h1 className="text-3xl sm:text-4xl italic max-w-lg">{e.titulo}</h1>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-10">
        <div><h2 className="text-xl text-primary">Contexto histórico</h2>{e.contexto.map((p) => <p key={p} className="mt-3 text-muted-foreground">{p}</p>)}</div>
        <div><h2 className="text-xl text-primary">Sistema electoral</h2><ul className="mt-3 space-y-3">{e.sistema.map((p) => <li key={p} className="border-l-2 border-celeste pl-3 text-muted-foreground">{p}</li>)}</ul></div>
      </div>
      <section id="candidatos" className="mt-16 scroll-mt-6">
        <h2 className="text-3xl text-primary">Candidatos</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">{e.candidatos.map((c) => <FichaCandidato key={c.id} c={c} />)}</div>
      </section>
      <Fuentes e={e} />
    </>
  );
}

function FichaCandidato({ c }: { c: Candidato }) {
  const tabs = [["propuestas", "Propuestas"], ["partido", "Ideas del partido"], ...(c.gobierno ? [["gobierno", "En el gobierno"]] : [])] as const;
  const [tab, setTab] = useState<string>("propuestas");
  return (
    <article className="border border-border bg-card p-6">
      <div className="flex gap-4">
        <div className="h-20 w-16 shrink-0 border border-dashed border-border bg-muted flex items-center justify-center text-center text-[9px] font-mono uppercase text-muted-foreground p-1">Foto de archivo pendiente</div>
        <div>
          <h3 className="text-2xl text-primary">{c.nombre}</h3>
          <p className="eyebrow mt-1">{c.partido} · Fórmula con {c.formula}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{c.trayectoria}</p>
      <div className="mt-5 flex gap-4 border-b border-border text-sm">
        {tabs.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={cn("pb-2 -mb-px", tab === k ? "border-b-2 border-primary text-primary" : "text-muted-foreground")}>{l}</button>)}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {tab === "propuestas" && c.propuestas.map((p) => <li key={p.valor}>— {p.valor}{!p.verificado && <Pendiente />}</li>)}
        {tab === "partido" && c.ideasPartido.map((p) => <li key={p}>— {p}</li>)}
        {tab === "gobierno" && c.gobierno?.map((p) => <li key={p.valor}>— {p.valor}{!p.verificado && <Pendiente />}</li>)}
      </ul>
    </article>
  );
}

function Fuentes({ e }: { e: Eleccion }) {
  return (
    <section className="mt-12 border-t border-border pt-6">
      <p className="eyebrow">Fuentes</p>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {e.fuentes.map((f) => <li key={f.titulo}>{f.url ? <a href={f.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{f.titulo}</a> : f.titulo}</li>)}
      </ul>
    </section>
  );
}

function Deposito({ c, anio }: { c: Candidato; anio: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative h-72 w-72">
        <div className="absolute left-1/2 top-0 w-40 -translate-x-1/2 animate-drop z-0">
          <div className="ballot p-3 text-center rounded-sm"><div className="eyebrow">{anio}</div><div className="font-display text-sm">{c.nombre}</div></div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-36 w-56 -translate-x-1/2 border-2 border-primary bg-card z-10">
          <div className="mx-auto -mt-1 h-2 w-28 bg-primary" />
          <div className="mt-8 text-center font-display text-primary">URNA</div>
          <div className="eyebrow text-center mt-1">Nación Argentina</div>
        </div>
      </div>
      <p className="mt-8 text-muted-foreground">Tu voto fue depositado.</p>
    </div>
  );
}

function Resultados({ e, voto, onRevisar }: { e: Eleccion; voto: string; onRevisar: () => void }) {
  const [conteos, setConteos] = useState<Record<string, number> | null>(null);
  useEffect(() => { getConteos(e.id).then(setConteos); }, [e.id]);
  const totalHist = e.candidatos.reduce((s, c) => s + c.votos.valor, 0);
  const ganador = [...e.candidatos].sort((a, b) => b.votos.valor - a.votos.valor)[0]!;
  const elegido = e.candidatos.find((c) => c.id === voto)!;
  const totalUsr = conteos ? Object.values(conteos).reduce((a, b) => a + b, 0) : 0;
  const next = elecciones[elecciones.findIndex((x) => x.id === e.id) + 1];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 animate-fade-up">
      <p className="eyebrow">Escrutinio · {e.anio}</p>
      <h1 className="mt-2 text-4xl text-primary">Votaste por {elegido.nombre}</h1>
      <p className="mt-3 text-muted-foreground">
        {elegido.id === ganador.id ? "Coincidiste con el resultado histórico." : `En la historia real ganó ${ganador.nombre} (${ganador.partido}).`}
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <section className="border border-border bg-card p-6">
          <p className="eyebrow">A · Resultado histórico oficial</p>
          <ul className="mt-5 space-y-4">
            {e.candidatos.map((c) => {
              const pct = (c.votos.valor / totalHist) * 100;
              return (
                <li key={c.id}>
                  <div className="flex justify-between text-sm"><span className={cn(c.id === voto && "font-semibold text-primary")}>{c.nombre}</span><span className="font-mono">{pct.toFixed(1)} %</span></div>
                  <div className="mt-1 h-2 bg-muted"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.votos.valor.toLocaleString("es-AR")} votos · {c.electores.valor} electores{(!c.votos.verificado || !c.electores.verificado) && <Pendiente />}</div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">Participación: {e.participacion.valor}{!e.participacion.verificado && <Pendiente />}</p>
          <p className="mt-3 text-sm">{e.explicacion}</p>
          <p className="mt-3 text-xs text-muted-foreground">Porcentajes calculados sobre los votos de estas cuatro candidaturas.</p>
        </section>

        <section className="border border-border bg-card p-6">
          <p className="eyebrow">B · Votos de visitantes de este sitio</p>
          {conteos === null ? <p className="mt-5 text-sm text-muted-foreground">Cargando…</p> : totalUsr === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">Todavía no hay votos registrados de visitantes para esta elección.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">{totalUsr} {totalUsr === 1 ? "persona participó" : "personas participaron"}</p>
              <ul className="mt-5 space-y-4">
                {e.candidatos.map((c) => {
                  const n = conteos[c.id] ?? 0; const pct = (n / totalUsr) * 100;
                  return (
                    <li key={c.id}>
                      <div className="flex justify-between text-sm"><span>{c.nombre}</span><span className="font-mono">{pct.toFixed(1)} % · {n}</span></div>
                      <div className="mt-1 h-2 bg-muted"><div className="h-full bg-celeste" style={{ width: `${pct}%` }} /></div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <p className="mt-5 text-xs text-muted-foreground">Solo se cuentan votos de quienes aceptaron sumarlos de forma anónima.</p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        {next ? <Link to="/eleccion/$anio" params={{ anio: next.id }} className="rounded-sm bg-primary px-6 py-3 text-primary-foreground">Siguiente elección →</Link>
          : <Link to="/perfil" className="rounded-sm bg-primary px-6 py-3 text-primary-foreground">Ver tu perfil político →</Link>}
        <button onClick={onRevisar} className="rounded-sm border border-border px-6 py-3">Revisar la ficha</button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Por ahora solo está disponible 1916; las próximas elecciones se irán sumando.</p>
    </div>
  );
}
