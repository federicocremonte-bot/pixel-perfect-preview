import { describe, expect, it } from "vitest";
import { computeProfile, MIN_ELECCIONES_PERFIL } from "./profile";

describe("perfil político", () => {
  it("requiere al menos 3 elecciones", () => {
    expect(MIN_ELECCIONES_PERFIL).toBe(3);
  });
  it("con una sola elección votada el resultado es inconcluso", () => {
    const p = computeProfile({ "1916": "yrigoyen" });
    expect(p.estado).toBe("inconcluso");
    if (p.estado === "inconcluso") expect(p.faltan).toBe(2);
  });
  it("ignora candidatos inexistentes", () => {
    expect(computeProfile({ "1916": "falso" }).votadas).toBe(0);
  });
});
