import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

const initialState = {
    modalOpen: false,
};

describe("pruebas en el uiReducer", () => {
    test("debe de retornar el estado por defecto", () => {
        const state = uiReducer(initialState, {});

        expect(state).toEqual(initialState);
    });
    test("debe de abrir y cerrar el modal", () => {
        const actionOpen = { type: types.uiOpenModal };
        const actionClose = { type: types.uiCloseModal };

        const stateOpen = uiReducer(initialState, actionOpen);

        expect(stateOpen).toEqual({ modalOpen: true });

        const stateClose = uiReducer(stateOpen, actionClose);

        expect(stateClose).toEqual({ modalOpen: false });
    });
});
