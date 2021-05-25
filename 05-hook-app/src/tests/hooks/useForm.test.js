import { act, renderHook } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("pruebas en el useForm", () => {
    const initialForm = {
        name: "Paco",
        email: "paco@paco.paco",
    };
    test("debe de regresar un formulario por defecto", () => {
        const { result } = renderHook(() => useForm(initialForm));
        const [formValues, handleInputChange, reset] = result.current;
        expect(formValues).toEqual(initialForm);
        expect(typeof handleInputChange).toBe("function");
        expect(typeof reset).toBe("function");
    });
    test("debe de cambiar el valor del formulario (name)", () => {
        const { result } = renderHook(() => useForm(initialForm));
        const [, handleInputChange] = result.current;

        act(() => {
            handleInputChange({
                target: {
                    name: "name",
                    value: "Pepe",
                },
            });
        });

        const [formValues] = result.current;

        expect(formValues.name).toBe("Pepe");
        expect(formValues).toEqual({ ...initialForm, name: "Pepe" });
    });

    test("debe de restablecer el formulario con RESET", () => {
        const { result } = renderHook(() => useForm(initialForm));
        const [, , reset] = result.current;

        act(() => {
            reset();
        });

        const [formValues] = result.current;

        expect(formValues).toEqual(initialForm);
    });
});
