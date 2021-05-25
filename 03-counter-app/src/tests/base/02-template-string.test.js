import { getSaludo } from "../../base/02-template-string";
import "@testing-library/jest-dom";

describe("Pruebas en 02-templates-string.js", () => {
    test("getSaludo debe retornar hola Paco", () => {
        const nombre = "Paco";

        const saludo = getSaludo(nombre);

        expect(saludo).toBe("Hola " + nombre + "!");
    });

    //getSaludo debe retornaar Hola Carlos! si no hay argumento.
    test("getSaludo default", () => {
        const saludo = getSaludo();

        expect(saludo).toBe("Hola Carlos!");
    });
});
