
import { types } from "../types/types";
// import moment from "moment"
// {
//     id: new Date().getTime(),
//         title: "Cumpleaños del jefe2",
//             start: moment().toDate(),
//                 end: moment().add(2, "hours").toDate(),
//                     notes: "Comprar el pastel",
//                         user: {
//         _id: "123",
//             name: "Fernando",
//             },
// },
// {
//     id: new Date().getTime(),
//         title: "Reunión de Pepe",
//             start: moment().add(1, "day").toDate(),
//                 end: moment().add(1, "day").add(2, "hours").toDate(),
//                     notes: "Comprar el pastel",
//                         user: {
//         _id: "123",
//             name: "Fernando",
//             },
// },

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            };

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
            };

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter((e) => {
                    return e.id !== state.activeEvent.id;
                }),
                activeEvent: null,
            };

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventCleaner:
            return {
                ...initialState
            }

        default:
            return state;
    }
};
