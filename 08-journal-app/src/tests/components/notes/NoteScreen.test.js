import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../components/actions/notes";

jest.mock("../../../components/actions/notes", () => ({
    activeNote: jest.fn(),
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
            id: 1234,
            title: "Hola",
            body: "Mundo",
            date: 0,
        },
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);

describe("pruebas en <NoteScreen/>", () => {
    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
    test("debe de llamar a activeNote", () => {
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Hola de nuevo",
            },
        });

        // Los efectos se eecutan siempre al renderizar y según el effect, luego al hacer un cambio
        // Con lo que con toHaveBeenLastCalledWith, obtenemos la última llamada
        expect(activeNote).toHaveBeenLastCalledWith(1234, {
            title: "Hola de nuevo",
            date: 0,
            body: "Mundo",
            id: 1234,
        });
    });
});
