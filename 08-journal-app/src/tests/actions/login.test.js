import {
    setLoginError,
    removeLoginError,
    startLoading,
    finishLoading,
} from "../../components/actions/login";
const { types } = require("../../types/types");

describe("pruebas en login-action", () => {
    test("deben de funcionar todas las acciones", () => {
        const state = setLoginError("Error u");

        expect(state).toEqual({
            type: types.loginSetError,
            payload: "Error u",
        });

        const state2 = removeLoginError();

        expect(state2).toEqual({
            type: types.loginRemoveError,
        });

        const state3 = startLoading();

        expect(state3).toEqual({
            type: types.loginStartLoading,
        });

        const state4 = finishLoading();

        expect(state4).toEqual({
            type: types.loginFinishLoading,
        });
    });
});
