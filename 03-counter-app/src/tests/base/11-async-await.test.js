import { getImagen } from "../../base/11-async-await";

describe("pruebas con async-await y fecth", () => {
    test("debe retornar el url de la imagen", async () => {
        const url = await getImagen();

        expect(url.includes("https://")).toBe(true);
    });
});
