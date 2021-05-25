import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";

import { authStartLogin, startChecking, startRegister } from "../../actions/auth";
import { types } from "../../types/types";

import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe("pruebas en las acciones auth", () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test("startLogin correcto", async () => {
        await store.dispatch(authStartLogin("paco@paco.paco", "123456"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            },
        });

        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith("token", expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith("token-init-date", expect.any(Number));

        // Averiguar mediante mock, con que argumentos han sido llamadas nuestras funciones de jest
        // Se devuelve un array con las llamadas
        // console.log(localStorage.setItem.mock.calls);
    });

    test("startLogin incorrecto", async () => {
        await store.dispatch(authStartLogin("paco@paco.paco", "123456s"));

        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error");

        await store.dispatch(authStartLogin("paco@paco22.paco", "123456"));
        actions = store.getActions();
        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalledWith("Error", "El usuario no existe con ese email", "error");
    });

    test("startRegister correcto", async () => {
        // Nos encontramos con el problema de que cada vez que se ejecute este test
        // creará un nuevo usuario en nuestra backend.
        // Para ello importamos el archivo import * as fetchModule from "../../helpers/fetch";
        // Y haremos un jest.fn() de la acción. Si dentro hay algun método que falla, tendremos que solucionarlo.
        // con un callback y declarando el método y escribiendo en duro lo que debe devolver

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "0987654331",
                    name: "pelé",
                    token: "12314312534543",
                };
            },
        }));

        await store.dispatch(startRegister("test@test.com", "123456", "test"));

        const actions = store.getActions();

        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "12314312534543");
        expect(localStorage.setItem).toHaveBeenCalledWith("token-init-date", expect.any(Number));

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: "0987654331",
                name: "pelé",
            },
        });
    });

    test("startChecking correcto", async () => {
        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "0987654331",
                    name: "pelé",
                    token: "12314312534543",
                };
            },
        }));
        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: "0987654331",
                name: "pelé",
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "12314312534543");
    });
});
