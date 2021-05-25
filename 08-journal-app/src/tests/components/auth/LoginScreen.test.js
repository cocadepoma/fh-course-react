import React from "react";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { startGoogleLogin, startLoginEmailPassword } from "../../../components/actions/auth";
jest.mock("../../../components/actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
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
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe("Pruebas en <LoginScreen/>", () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de disparar la acción de startGoogleLogin", () => {
        wrapper.find(".google-btn").prop("onClick")();

        expect(startGoogleLogin).toHaveBeenCalledTimes(1);
    });

    test("debe de disparar el submit con los valores actuales", () => {
        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

        expect(startLoginEmailPassword).toHaveBeenCalledWith("nando@gmail.com", "123456");
    });
});
