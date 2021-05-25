import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { authStartLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';


jest.mock("../../../actions/auth", () => ({
    authStartLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();


const wrapper = mount(

    <Provider store={store}>
        <LoginScreen />
    </Provider>

);


describe('pruebas en LoginScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar el dispatch del login', () => {

        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'jjdsds@pdsafcs.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault: jest.fn()
        });

        expect(authStartLogin).toHaveBeenCalledWith('jjdsds@pdsafcs.com', '123456');
    });

    test('no hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '12345'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });


        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault: jest.fn()
        });

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales', 'error');
        expect(startRegister).not.toHaveBeenCalled();
    });

    test('debe dispararse el registra si las contraseñas coinciden', () => {
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '123456'
            }
        });
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'pruebas'
            }
        });
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'jjdsds@pdsafcs.com'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault: jest.fn()
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith('jjdsds@pdsafcs.com', '123456', 'pruebas');
    });




});
