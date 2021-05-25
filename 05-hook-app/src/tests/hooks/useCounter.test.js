import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "../../hooks/useCounter";

describe("pruebas en useCounter", () => {
    // useCounter TESTS
    test("debe de retornar valores por defecto", () => {
        // Poner el hook en funcionamiento
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
        expect(typeof result.current.increment).toBe("function");
        expect(typeof result.current.decrement).toBe("function");
        expect(typeof result.current.reset).toBe("function");
    });

    test("debe de retornar el counter en el valor pasado", () => {
        const counter = 100;
        // Poner el hook en funcionamiento
        const { result } = renderHook(() => useCounter(counter));

        expect(result.current.counter).toBe(counter);
    });

    test("debe de incrementar el counter en 1", () => {
        // Para poder hacer pruebas en funciones de los hooks, hay que importar {act} de react hooks
        // act recibe un callback, y dentro podemos llamar a las funciones que necesitemos
        const count = 100;
        const { result } = renderHook(() => useCounter(count));
        const { increment } = result.current;
        act(() => {
            increment();
        });
        const { counter } = result.current;

        expect(counter).toBe(count + 1);
    });
    test("debe de decrementar el counter en 1", () => {
        // Para poder hacer pruebas en funciones de los hooks, hay que importar {act} de react hooks
        // act recibe un callback, y dentro podemos llamar a las funciones que necesitemos
        const count = 100;
        const { result } = renderHook(() => useCounter(count));
        const { decrement } = result.current;
        act(() => {
            decrement();
        });
        const { counter } = result.current;

        expect(counter).toBe(count - 1);
    });
    test("debe de resetear al valor por defecto", () => {
        // Para poder hacer pruebas en funciones de los hooks, hay que importar {act} de react hooks
        // act recibe un callback, y dentro podemos llamar a las funciones que necesitemos
        const count = 100;
        const { result } = renderHook(() => useCounter(count));
        const { decrement } = result.current;
        const { reset } = result.current;

        act(() => {
            // Aquí sólo se ejecuta una vez, aunque lo llamemos varias veces
            decrement();
            reset();
        });
        const { counter } = result.current;

        expect(counter).toBe(count);
    });
});
