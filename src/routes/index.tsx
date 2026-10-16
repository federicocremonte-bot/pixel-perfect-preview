import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { Boleta } from "@/components/Boleta";
import { MapaElectoral } from "@/components/MapaElectoral";
import { elecciones } from "@/data/elecciones";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Archivo del Voto — Historia electoral argentina interactiva" },
      { name: "description", content: "Recorré las elecciones presidenciales argentinas desde 1916, votá con boletas de época y descubrí tu perfil político a través de la historia." },
      { property: "og:title", content: "Archivo del Voto — Historia electoral argentina" },
      { property: "og:description", content: "Una experiencia interactiva para votar en elecciones históricas argentinas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const e = elecciones[0]!;
  return (
    <SiteFrame>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="animate-fade-up">
          <p className="eyebrow">Expediente N.º 1 · Desde 1916</p>
          <h1 className="mt-4 text-5xl sm:text-6xl leading-[1.02] text-primary">
            Cada boleta,<br /><span className="italic">una época.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Recorré las elecciones presidenciales argentinas, conocé a sus candidatos y emití tu propio voto histórico.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/eleccion/$anio" params={{ anio: e.id }} className="rounded-sm bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors">
              Comenzar recorrido
            </Link>
            <Link to="/recorrido" className="text-sm text-primary underline underline-offset-4">Ver la línea de tiempo</Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Simulación educativa: tu voto no modifica resultados oficiales.</p>
        </div>
        <div className="animate-fade-up">
          <p className="eyebrow mb-3">Mapa electoral</p>
          <MapaElectoral />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <p className="eyebrow">Boletas de {e.anio} · recreaciones de época</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
          {e.candidatos.map((c) => <Boleta key={c.id} c={c} anio={e.anio} />)}
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16 grid sm:grid-cols-3 gap-10">
          {[
            ["I", "Conocé", "Contexto, sistema electoral y candidatos de cada elección, con fuentes."],
            ["II", "Votá", "Elegí una boleta, confirmá tu voto y comparalo con el resultado real."],
            ["III", "Descubrí", "Al final, una lectura orientativa del perfil que sugieren tus elecciones."],
          ].map(([n, t, d]) => (
            <div key={n}>
              <div className="font-display text-3xl italic text-celeste">{n}</div>
              <h2 className="mt-2 text-2xl text-primary">{t}</h2>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
