import { procesoPesado } from "../../helpers/procesoPesado";

describe("probar el helper procesoPesado", () => {
    test("debe de retornar un string con el número de repeticiones", () => {
        const iteraciones = 100;
        const str = procesoPesado(iteraciones);

        expect(str).toBe(`${iteraciones} iteraciones realizadas`);
    });
});
