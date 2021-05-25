import { useFetch } from "../../hooks/useFetch";
import { renderHook } from "@testing-library/react-hooks";
describe("pruebas en useFetch", () => {
    test("debe de retornar la información por defecto", () => {
        const { result } = renderHook(() => useFetch(`https://www.breakingbadapi.com/api/quotes/1`));
        const { data, loading, error } = result.current;
        expect(data).toBe(null);
        expect(loading).toBe(true);
        expect(error).toBe(null);
    });
    test("debe de tener la info deseada, loading false, error false", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetch(`https://www.breakingbadapi.com/api/quotes/1`));
        await waitForNextUpdate({ timeout: 5000 });

        const { data, loading, error } = result.current;

        expect(data.length).toBe(1);
        expect(loading).toBe(false);
        expect(error).toBe(null);
    });
    test("debe de controlar el error", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch(`https://www.breakingbadapi.com/apid/quotess/963453`)
        );
        await waitForNextUpdate({ timeout: 5000 });

        const { data, loading, error } = result.current;

        expect(data).toBe(null);
        expect(loading).toBe(false);
        expect(error).toBe("No se pudo cargar la info");
    });
});
