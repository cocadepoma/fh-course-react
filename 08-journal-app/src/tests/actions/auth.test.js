import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { login, logout } from "../../components/actions/auth";
import { types } from "../../types/types";
import { startLogout, startLoginEmailPassword } from "../../components/actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

describe("pruebas con las acciones de auth", () => {
    beforeEach(() => {
        store.clearActions();
    });

    test("login y logout deben de crear la acción respectiva", () => {
        const user = {
            uid: "dasdsada",
            displayName: "pepote",
        };
        const state = login(user.uid, user.displayName);

        expect(state).toEqual({
            type: types.login,
            payload: user,
        });

        const state2 = logout();
        expect(state2).toEqual({ type: types.logout });
    });

    test("debe de realizar el logout", async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLogoutCleaning,
        });
        expect(actions[1]).toEqual({
            type: types.logout,
        });
    });

    test("debe de iniciar el startLoginEmailPassword", async () => {
        await store.dispatch(startLoginEmailPassword("pepe@pepe.es", "123456"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: types.loginStartLoading });
        expect(actions[1]).toEqual({
            type: types.login,
            payload: { uid: "4cjnW3oWQ3Y47l36RiTUB0waKB13", displayName: null },
        });
        expect(actions[2]).toEqual({ type: types.loginFinishLoading });
    });
});
