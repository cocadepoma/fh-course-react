import { types } from "../types/types";

const initialState = {
    activeDate: null,
};

export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.dateSet:
            return {
                ...state,
                activeDate: action.payload,
            };
        case types.dateClear:
            return {
                ...state,
                activeDate: null,
            };
        default:
            return state;
    }
};
