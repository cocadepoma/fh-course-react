import { types } from "../../types/types";

export const setLoginError = (err) => ({
    type: types.loginSetError,
    payload: err,
});

export const removeLoginError = () => ({
    type: types.loginRemoveError,
});

export const startLoading = () => ({
    type: types.loginStartLoading,
});

export const finishLoading = () => ({
    type: types.loginFinishLoading,
});
