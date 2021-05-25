import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { firebase } from "../../firebase/firebase-config";

import { login } from "../../components/actions/auth";
import { AppRouter } from "../../components/routers/AppRouter";
import { act } from "react-dom/test-utils";

jest.mock("../../components/actions/auth", () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    login: {
        loading: false,
        msgError: null,
    },
    notes: {
        notes: [],
        active: {
            id: "dsdsd",
        },
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("pruebas en <AppRouter/>", () => {
    test("debe de llamar el login si estoy autenticado", async () => {
        await act(async () => {
            const { user } = await firebase
                .auth()
                .signInWithEmailAndPassword("pepe@pepe.es", "123456");

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalledWith("4cjnW3oWQ3Y47l36RiTUB0waKB13", null);
    });
});
