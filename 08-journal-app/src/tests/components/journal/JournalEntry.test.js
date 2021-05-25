import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../components/actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
    id: 123,
    title: "hola",
    date: 0,
    body: "Mundo",
    url: "https://github.com",
};

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note} />
    </Provider>
);

describe("pruebas en <JournalEntry/>", () => {
    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de poner la nota en active", () => {
        wrapper.find(".journal__entry").prop("onClick")();

        // En lugar de hacer un mock, también se puede comprobar con que parámetros ha sido llamada
        // Hay que tener en cuenta que siempre que tengamos diferentes dispatch puede llevarnos a confusión
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));
    });
});
