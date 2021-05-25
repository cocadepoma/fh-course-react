import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true,
}

const actionLogin = {
    type: types.authLogin,
    payload: {
        uid: 'ASBDCSAC',
        name: 'testingName'
    }
}
describe('pruebas en authReducer', () => {


    test('debe de retornar el estado por defecto', () => {

        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);

    });

    test('debe de hacer login correctamente', () => {

        const state = authReducer(initialState, actionLogin);

        expect(state).toEqual({
            checking: false,
            uid: 'ASBDCSAC',
            name: 'testingName'
        });

    });

    test('debe de establecer el checking a false', () => {

        const state = authReducer(initialState, { type: types.authCheckingFinish });

        expect(state.checking).toBeFalsy();

    });

    test('debe de hacer logout', () => {

        const state = authReducer(initialState, actionLogin);

        const stateLogout = authReducer(state, { type: types.authLogout });

        expect(stateLogout).toEqual({ checking: false });

    });

});
