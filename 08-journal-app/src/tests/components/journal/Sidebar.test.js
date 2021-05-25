import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startNewNote } from "../../../components/actions/notes";
import { startLogout } from "../../../components/actions/auth";

jest.mock("../../../components/actions/auth", () => ({
    startLogout: jest.fn(),
}));
jest.mock("../../../components/actions/notes", () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {},
    ui: {
        loading: "1",
        msgError: "Fer",
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

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
);

describe("pruebas en <Sidebar/>", () => {
    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de llamar la acción startLogout", () => {
        wrapper.find("button").prop("onClick")();

        expect(startLogout).toHaveBeenCalledTimes(1);
    });

    test("debe de llamar la acción startNewNote", () => {
        wrapper.find(".journal__new-entry").prop("onClick")();

        expect(startNewNote).toHaveBeenCalledTimes(1);
    });
});
