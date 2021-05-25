import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock("../../../actions/events", () => ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const dateNow = moment().minutes(0).seconds(0).add(1, "hours");
const dateNowPlus1 = dateNow.clone().add(1, "hours");

const initialState = {
    calendar: {
        events: [],
        activeEvent: {
            title: "Instalar Zoom",
            notes: "",
            start: dateNow.toDate(),
            end: dateNowPlus1.toDate(),
        }
    },
    auth: {
        checking: false,
        uid: "6046150e9bab0f0bf3b9aa8d",
        name: "Paco"
    },
    ui: {
        modalOpen: true
    },
    date: {
        activeDate: null
    }
};

const store = mockStore(initialState);
store.dispatch = jest.fn();


const wrapper = mount(

    <Provider store={store}>
        <CalendarModal />
    </Provider>

);

describe('pruebas en CalendarModal', () => {

    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    test('debe de mostrar el modal', () => {

        //expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

    });

    test('debe de llamar la acción de actualizar y cerrar modal', () => {

        wrapper.find('form').simulate('submit', { preventDefault() { } });

        setTimeout(() => {
            expect(eventStartUpdate).toHaveBeenCalledWith(initialState.calendar.activeEvent);
            expect(eventClearActive).toHaveBeenCalledTimes(1);
        }, 300);
    });

    test('debe de mostrar error si falta el título', () => {

        wrapper.find('form').simulate('submit', { preventDefault() { } });

        setTimeout(() => {
            expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
        }, 300);

    });

    test('debe de crear un nuevo evento', () => {

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
                modalOpen: true
            },
            date: {
                activeDate: null
            }
        };

        const store = mockStore(initialState);
        store.dispatch = jest.fn();

        const wrapper = mount(

            <Provider store={store}>
                <CalendarModal />
            </Provider>

        );

        act(() => {
            wrapper.find('input[name="title"]').prop('onChange')({
                target: {
                    value: 'Hola pruebas',
                    name: 'title'
                }
            });
        });

        wrapper.find('form').simulate('submit', { preventDefault() { } });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            notes: '',
            title: 'Hola pruebas'
        });

        setTimeout(() => {
            expect(eventClearActive).toHaveBeenCalled();
        }, 300);

    });


    test('debe de validar las fechas', () => {

        act(() => {
            wrapper.find('input[name="title"]').prop('onChange')({
                target: {
                    value: 'Hola pruebas',
                    name: 'title'
                }
            });
        });

        const dateNow = moment().minutes(0).seconds(0).add(1, "hours");
        const dateNowPlus1 = dateNow.clone().add(1, "hours");

        act(() => {
            wrapper.find('DateTimePicker').at(0).prop('onChange')(dateNowPlus1.toDate());
            wrapper.find('DateTimePicker').at(1).prop('onChange')(dateNow.toDate());
        });
        wrapper.find('form').simulate('submit', { preventDefault() { } });

        expect(Swal.fire).toHaveBeenCalledWith({
            "confirmButtonText": "Cool",
            "icon": "error",
            "text": "La fecha de fin debe de ser posterior a la fecha de inicio",
            "timer": 2500,
            "title": "Error!",
        })


    });




});
