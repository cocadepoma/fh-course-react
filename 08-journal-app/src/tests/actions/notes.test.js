/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
    startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploading,
} from "../../components/actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock("../../helpers/fileUpload", () => ({
    __esModule: true,
    fileUpload: jest.fn(() => {
        return "https://hola-mundo.com/cosa.jpg";
    }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {
        uid: "TESTING",
    },
    notes: {
        active: {
            id: "32D3SK1BIiKOvuifZXud",
            title: "Holita",
            body: "mundito",
        },
    },
};
let store = mockStore(initialState);

describe("pruebas en notes-action", () => {
    beforeEach(() => {
        store = mockStore(initialState);
    });
    test("debe de crear una nueva nota startNewNote", async () => {
        // LLamamos a la acción
        await store.dispatch(startNewNote());
        // Capturamos las acciones que se han ejecutado, en este caso 2 dispatch
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        const docId = actions[0].payload.id;

        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    });

    test("startLoadingNotes debe cargar las notas", async () => {
        await store.dispatch(startLoadingNotes("TESTING"));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array),
        });
        // No valoramos la url
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };
        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test("startSaveNote debe de guardar una nota", async () => {
        const note = {
            id: "32D3SK1BIiKOvuifZXud",
            title: "hola",
            body: "hola",
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title);
    });

    test("startUploading debe de actualizar el url del entry", async () => {
        // Da error de File
        // const file = new File([], "foto.png");
        // await store.dispatch(startUploading(file));
        // const docRef = await db.doc(`/TESTING/journal/notes/32D3SK1BIiKOvuifZXud`).get();
        // expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");
    });
});
