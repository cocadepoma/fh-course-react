import { removeError, setError } from "../../components/actions/ui";
import { types } from "../../types/types";

describe("pruebas en ui-actions", () => {
    test("todas las acciones deben de funcionar", () => {
        const action = setError("Error aquí");

        expect(action).toEqual({
            type: types.uiSetError,
            payload: "Error aquí",
        });

        const action2 = removeError();

        expect(action2.type).toEqual(types.uiRemoveError);
    });
});
