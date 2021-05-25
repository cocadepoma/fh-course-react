import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("pruebas en authReducer", () => {
    test("debe de retornar el estado por defecto", () => {
        const { logged } = authReducer({ logged: false }, {});

        expect(logged).toBe(false);
    });

    test("debe de autenticar y establecer el name del user", () => {
        const action = {
            type: types.login,
            payload: {
                name: "Paco",
            },
        };
        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({ logged: true, name: "Paco" });
    });

    test("debe de borrar el name del user y logged en false", () => {
        const action = {
            type: types.logout,
        };
        const state = authReducer({ name: "Paco", logged: true }, action);

        expect(state).toEqual({ logged: false });
    });
});
