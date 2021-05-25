import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


// store.dispatch = jest.fn();


describe('pruebas en AppRouter', () => {

    test('debe de mostrar el espere...', () => {

        const initialState = {
            auth: {
                checking: true
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(

            <Provider store={store}>
                <AppRouter />
            </Provider>

        );

        expect(wrapper.find('h5').exists()).toBeTruthy();
    });

    test('debe de mostrar la ruta pública', () => {

        const initialState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(

            <Provider store={store}>
                <AppRouter />
            </Provider>

        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBeTruthy();
    });

    test('debe de mostrar la ruta privada', () => {

        const initialState = {
            auth: {
                checking: false,
                uid: '32423423423',
                name: 'JC'
            },
            calendar: {
                events: [],
                activeEvent: null,
            },
            ui: {
                modalOpen: false,
            },
            date: {
                activeEvent: null,
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(

            <Provider store={store}>
                <AppRouter />
            </Provider>

        );

        //expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
        expect(wrapper.find('Calendar').exists()).toBeTruthy();
    });





})
