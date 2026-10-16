import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFrame } from "@/components/SiteFrame";
import { elecciones, type Eje } from "@/data/elecciones";
import { computeProfile, describir, ejesInfo, MIN_ELECCIONES_PERFIL, type Votos } from "@/lib/profile";
import { getVotos, resetVotos } from "@/lib/votes";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Tu perfil político a través de la historia — Archivo del Voto" },
      { name: "description", content: "Una lectura orientativa, contextualizada por época, de las preferencias que mostraste al votar en elecciones históricas argentinas." },
      { property: "og:title", content: "Tu perfil político a través de la historia" },
      { property: "og:description", content: "Descubrí qué sugieren tus votos históricos, con criterios explicados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Perfil,
});

const EJEMPLO: Record<Eje, number> = { participacion: 1.6, estado: 0.4, social: 1.1 };

function Ejes({ p }: { p: Record<Eje, number> }) {
  return (
    <ul className="space-y-6">
      {(Object.keys(ejesInfo) as Eje[]).map((k) => (
        <li key={k}>
          <div className="text-sm font-semibold text-primary">{ejesInfo[k].nombre}</div>
          <div className="relative mt-3 h-1 bg-border">
            <div className="absolute left-1/2 -top-1 h-3 w-px bg-muted-foreground" />
            <div className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-primary" style={{ left: `${((p[k] + 2) / 4) * 100}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{ejesInfo[k].neg}</span><span>{ejesInfo[k].pos}</span></div>
        </li>
      ))}
    </ul>
  );
}

function Perfil() {
  const [votos, setVotos] = useState<Votos>({});
  useEffect(() => setVotos(getVotos()), []);
  const perfil = computeProfile(votos);
  const resumen = Object.entries(votos).map(([eid, cid]) => {
    const e = elecciones.find((x) => x.id === eid);
    return { e, c: e?.candidatos.find((c) => c.id === cid) };
  }).filter((r) => r.e && r.c);

  return (
    <SiteFrame>
      <div className="mx-auto max-w-4xl px-5 py-14 animate-fade-up">
        <p className="eyebrow">Cierre del recorrido</p>
        <h1 className="mt-3 text-4xl sm:text-5xl text-primary">Tu perfil político <span className="italic">a través de la historia</span></h1>

        <section className="mt-10">
          <h2 className="text-xl text-primary">Tus votos</h2>
          {resumen.length === 0 ? (
            <p className="mt-3 text-muted-foreground">Todavía no votaste. <Link to="/eleccion/$anio" params={{ anio: "1916" }} className="text-primary underline">Empezá por 1916</Link>.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {resumen.map(({ e, c }) => <li key={e!.id} className="flex justify-between py-3"><span className="font-display text-xl">{e!.anio}</span><span>{c!.nombre} <span className="text-muted-foreground">· {c!.partido}</span></span></li>)}
            </ul>
          )}
        </section>

        {perfil.estado === "inconcluso" ? (
          <section className="mt-10 border border-border bg-card p-6">
            <p className="eyebrow">Resultado</p>
            <h2 className="mt-2 text-3xl text-primary">Inconcluso</h2>
            <p className="mt-3 text-muted-foreground">Necesitamos al menos {MIN_ELECCIONES_PERFIL} elecciones votadas para identificar una tendencia razonable. Te {perfil.faltan === 1 ? "falta 1" : `faltan ${perfil.faltan}`}.</p>
            <div className="mt-8 border-t border-dashed border-border pt-6">
              <p className="eyebrow">Ejemplo ilustrativo · no es tu resultado</p>
              <p className="mt-3 italic">{describir(EJEMPLO)}</p>
              <div className="mt-6"><Ejes p={EJEMPLO} /></div>
            </div>
          </section>
        ) : (
          <section className="mt-10 border border-border bg-card p-6">
            <p className="eyebrow">Lectura orientativa</p>
            <p className="mt-3 text-lg">{perfil.descripcion}</p>
            <div className="mt-6"><Ejes p={perfil.promedios} /></div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl text-primary">Cómo se calcula</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>— No usamos el nombre del partido. Cada candidatura se ubica en tres ejes según lo que significaba en su época.</li>
            <li>— Esas ubicaciones son interpretaciones históricas, justificadas en cada ficha, y pueden discutirse.</li>
            <li>— Las etiquetas de 1916 no equivalen a las actuales: «liberal» o «conservador» cambian de sentido con el tiempo.</li>
            <li>— Es una orientación, no un diagnóstico. Se calcula en tu dispositivo y no se guarda ni se comparte.</li>
          </ul>
          {resumen.length > 0 && <button onClick={() => { resetVotos(); setVotos({}); }} className="mt-6 text-sm text-destructive underline">Borrar mis votos de este dispositivo</button>}
        </section>
      </div>
    </SiteFrame>
  );
}
