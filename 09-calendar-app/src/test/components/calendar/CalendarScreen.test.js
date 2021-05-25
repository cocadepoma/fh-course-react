
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';

import { eventSetActive } from '../../../actions/events';
import { act } from '@testing-library/react';


jest.mock("../../../actions/events", () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    calendar: {
        events: [],
        activeEvent: null
    },
    auth: {
        checking: false,
        uid: "6046150e9bab0f0bf3b9aa8d",
        name: "Paco"
    },
    ui: {
        modalOpen: false
    },
    date: {
        activeDate: null
    }
};

const store = mockStore(initialState);
store.dispatch = jest.fn();


const wrapper = mount(

    <Provider store={store}>
        <CalendarScreen />
    </Provider>

);
describe('pruebas en CalendarScreen', () => {

    // Every month will fail because the position of the days is always different
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');

        expect(calendarMessages).toEqual(messages)
        //wrapper.find('Calendar').prop('onDoubleClickEvent')();

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal, })

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' })

        act(() => {
            calendar.prop('onView')('week');
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');

    });

});
