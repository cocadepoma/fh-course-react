import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDeleting } from '../../../actions/events';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";


jest.mock("../../../actions/events", () => ({
    eventStartDeleting: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();


const wrapper = mount(

    <Provider store={store}>
        <DeleteEventFab />
    </Provider>

);


describe('pruebas en DeleteEventFab', () => {


    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar la acción eventStartDelete al hacer click', () => {

        wrapper.find('button').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventStartDeleting).toHaveBeenCalled();
    });





})
