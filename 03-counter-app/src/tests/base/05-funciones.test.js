import "@testing-library/jest-dom";
import { getUser, getUsuarioActivo } from "../../base/05-funciones";

describe("Pruebas en 05-funciones", () => {
    test("getUser debe dew retornar un objeto", () => {
        const userTest = {
            uid: "ABC123",
            username: "El_Papi1502",
        };
        const user = getUser();
        expect(user).toEqual(userTest);
    });

    test("getUsuario activo debe retornar un objeto", () => {
        const nombre = "Juan";

        const getUsuario = getUsuarioActivo(nombre);

        expect(getUsuario).toEqual({
            uid: "ABC567",
            username: nombre,
        });
    });
});
