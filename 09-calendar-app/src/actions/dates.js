import { types } from "../types/types";

export const setDate = (date) => ({
    type: types.dateSet,
    payload: date,
});
export const clearDate = () => ({
    type: types.dateClear,
});
