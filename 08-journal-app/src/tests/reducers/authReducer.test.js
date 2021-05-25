import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("pruebas en authReducer", () => {
    const user = { uid: "ABCD", name: "John" };

    const action = {
        type: types.login,
        payload: {
            uid: "ABCD",
            displayName: "John",
        },
    };

    test("debe de devolver el estado por defecto", () => {
        const state = authReducer({}, {});

        expect(state).toEqual({});
    });

    test("no debe de hacer cambios del estado actual", () => {
        const state = authReducer(user, { type: "fake type" });

        expect(state).toEqual(user);
    });

    test("debe de devolver el state con el name y uid usuario", () => {
        const state = authReducer({}, action);

        expect(state).toEqual(user);
    });

    test("debe de devolver un objeto vacío despues del logout", () => {
        const state = authReducer({}, action);

        expect(state).toEqual(user);

        const state2 = authReducer(state, { type: types.logout });

        expect(state2).toEqual({});
    });
});
