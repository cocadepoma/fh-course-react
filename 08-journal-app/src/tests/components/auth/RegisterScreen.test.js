import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { RegisterScreen } from "../../../components/auth/RegisterScreen";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { types } from "../../../types/types";

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
};

let store = mockStore(initialState);
// Descomentar para valorar cosas asíncronas
//store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {
    test("debe de mostrar correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de hacer el dispatch de la acción respectiva", () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate("change", {
            target: {
                value: "",
                name: "email",
            },
        });

        wrapper.find("form").simulate("submit", {
            preventDefault() {},
        });

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: "The email input should be filled with a valid email",
        });
    });

    test("debe de mostrar la caja de alerta con el error", () => {
        const initialState = {
            auth: {},
            ui: {
                loading: false,
                msgError: "Email no es correcto",
            },
            login: {
                loading: false,
                msgError: null,
            },
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(".auth__alert-error").text().trim()).toBe(initialState.ui.msgError);
        expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    });
});
