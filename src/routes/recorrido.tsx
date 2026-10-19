import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { periodos, getEleccion } from "@/data/elecciones";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recorrido")({
  head: () => ({
    meta: [
      { title: "Recorrido cronológico — Archivo del Voto" },
      { name: "description", content: "Línea de tiempo de las elecciones presidenciales argentinas, golpes de Estado y proscripciones desde 1916." },
      { property: "og:title", content: "Recorrido cronológico — Archivo del Voto" },
      { property: "og:description", content: "Elecciones, interrupciones y proscripciones en la historia argentina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Recorrido,
});

const etiquetaEstado = { disponible: "Disponible", proximamente: "Próximamente", interrupcion: "Sin elección", restringida: "No comparable" };

function Recorrido() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-3xl px-5 py-14">
        <p className="eyebrow">Cronología</p>
        <h1 className="mt-3 text-4xl text-primary">Un siglo de urnas, y de silencios</h1>
        <p className="mt-4 text-muted-foreground">Los golpes de Estado y las elecciones con fraude o proscripción se marcan aparte: no fueron elecciones democráticas equivalentes.</p>
        <ol className="mt-10 border-l border-border">
          {periodos.map((p) => {
            const body = (
              <div className={cn("ml-6 py-4 border-b border-border", p.estado === "proximamente" && "opacity-60")}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl w-16 text-primary">{p.anio}</span>
                  <span className="flex-1">{p.etiqueta}</span>
                  <span className={cn("eyebrow", p.estado === "disponible" && "text-primary", (p.estado === "interrupcion" || p.estado === "restringida") && "text-destructive")}>{etiquetaEstado[p.estado]}</span>
                </div>
                {p.nota && <p className="ml-20 mt-1 text-sm text-muted-foreground">{p.nota}</p>}
              </div>
            );
            return (
              <li key={p.anio} className="relative">
                <span className={cn("absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full", p.estado === "disponible" ? "bg-primary" : p.estado === "proximamente" ? "bg-border" : "bg-destructive")} />
                {getEleccion(String(p.anio)) ? <Link to="/eleccion/$anio" params={{ anio: String(p.anio) }} className="block hover:bg-card">{body}</Link> : body}
              </li>
            );
          })}
        </ol>
      </div>
    </SiteFrame>
  );
}
