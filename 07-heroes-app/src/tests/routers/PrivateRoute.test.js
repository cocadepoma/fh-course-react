import React from "react";
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <PrivateRoute/>", () => {
    const props = {
        location: {
            pathname: "/marvel",
        },
    };
    // Para poder simular localstorage
    Storage.prototype.setItem = jest.fn();
    test("debe de mostrar el componente si está autenticado y guardar localstorage", () => {
        // Cuando usamos un High Order Component debemos usar mount, porque shallow no lo renderiza
        // con lo que si imprimimos por consola con .html() nos lo mostrará, pero en el expect
        // no nos va a funcionar correctamente, porque no renderiza lo de dentro.
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", props.location.pathname);
    });

    test("debe de bloquear el componente si no está autenticado", () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find("span").exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", props.location.pathname);
    });
});
