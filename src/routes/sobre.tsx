import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre el proyecto y fuentes — Archivo del Voto" },
      { name: "description", content: "Propósito, metodología, fuentes y privacidad del Archivo del Voto, una experiencia educativa sobre elecciones argentinas." },
      { property: "og:title", content: "Sobre el proyecto y fuentes — Archivo del Voto" },
      { property: "og:description", content: "Metodología, fuentes históricas y qué datos se registran." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <SiteFrame>
      <article className="mx-auto max-w-2xl px-5 py-14 space-y-10">
        <header>
          <p className="eyebrow">Sobre el proyecto</p>
          <h1 className="mt-3 text-4xl text-primary">Un archivo para votar de nuevo</h1>
          <p className="mt-4 text-muted-foreground">Una experiencia educativa, no partidaria, para conocer la historia electoral argentina desde 1916.</p>
        </header>
        <section><h2 className="text-2xl text-primary">Rigor</h2><p className="mt-3 text-muted-foreground">Separamos propuestas de campaña, ideas del partido, medidas de gobierno, resultados oficiales e interpretaciones. Todo dato aún no contrastado con fuentes oficiales lleva la etiqueta «Pendiente de verificación».</p></section>
        <section><h2 className="text-2xl text-primary">Fuentes</h2><ul className="mt-3 space-y-1 text-muted-foreground">
          <li>— <a className="underline" href="https://www.electoral.gob.ar/" target="_blank" rel="noreferrer">Cámara Nacional Electoral</a></li>
          <li>— <a className="underline" href="https://www.argentina.gob.ar/interior/dine" target="_blank" rel="noreferrer">Dirección Nacional Electoral</a></li>
          <li>— Botana, N. «El orden conservador» (1977).</li>
          <li>— Rock, D. «El radicalismo argentino, 1890-1930» (1977).</li>
        </ul></section>
        <section><h2 className="text-2xl text-primary">Privacidad</h2><p className="mt-3 text-muted-foreground">Si aceptás, tu voto suma +1 a un contador anónimo por candidato. No guardamos nombre, correo ni historial individual. Tus votos y tu perfil quedan solo en tu dispositivo y podés borrarlos cuando quieras.</p></section>
      </article>
    </SiteFrame>
  );
}
