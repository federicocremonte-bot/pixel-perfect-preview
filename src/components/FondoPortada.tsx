// Fondo decorativo de la portada: bandera argentina translúcida + firmas presidenciales.
// Solo firmas verificadas en Wikimedia Commons (dominio público). Agregar más aquí tras verificar su licencia.
export const firmas = [
  { presidente: "Hipólito Yrigoyen", url: "https://upload.wikimedia.org/wikipedia/commons/d/da/Hip%C3%B3lito_Yrigoyen_-_Firma.svg", licencia: "Dominio público", fuente: "https://commons.wikimedia.org/wiki/File:Hip%C3%B3lito_Yrigoyen_-_Firma.svg" },
  { presidente: "Marcelo T. de Alvear", url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Firma_de_Marcelo_T._de_Alvear.svg", licencia: "Dominio público", fuente: "https://commons.wikimedia.org/wiki/File:Firma_de_Marcelo_T._de_Alvear.svg" },
];

const pistas = [
  { top: "8%", delay: "0s", w: 260, f: 0 },
  { top: "62%", delay: "-13s", w: 220, f: 1 },
  { top: "34%", delay: "-26s", w: 240, f: 0 },
  { top: "84%", delay: "-6s", w: 200, f: 1 },
];

export function FondoPortada() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.22]"
        style={{ background: "linear-gradient(180deg, var(--celeste) 0 33.3%, var(--paper) 33.3% 66.6%, var(--celeste) 66.6% 100%)" }} />
      <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 h-[min(30vw,220px)] w-[min(30vw,220px)] -translate-x-1/2 -translate-y-1/2 opacity-20">
        <g fill="oklch(0.75 0.13 80)">
          {Array.from({ length: 32 }).map((_, i) => (
            <polygon key={i} points={i % 2 ? "50,4 52,30 48,30" : "50,10 51.5,30 48.5,30"} transform={`rotate(${i * 11.25} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="19" />
        </g>
      </svg>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, color-mix(in oklab, var(--background) 70%, transparent), transparent 70%)" }} />
      {pistas.map((p, i) => (
        <img key={i} src={firmas[p.f]!.url} alt="" loading="lazy"
          className="animate-firma absolute left-0"
          style={{ top: p.top, width: p.w, animationDelay: p.delay, ["--firma-op" as string]: 0.13 }} />
      ))}
    </div>
  );
}
