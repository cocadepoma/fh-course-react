import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loginSetError:
            return {
                ...state,
                msgError: action.payload,
            };

        case types.loginRemoveError:
            return {
                ...state,
                msgError: null,
            };
        case types.loginStartLoading:
            return {
                ...state,
                loading: true,
            };
        case types.loginFinishLoading:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
