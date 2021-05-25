import React from "react";
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en <AppRouter />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: false },
    };

    test("debe de mostrar login si no está autenticado", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h1").text().trim()).toBe("Login Screen");
    });

    test("debe de mostrar el componente marvel si está autenticado", () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: { name: "paco", logged: true },
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find("nav").exists()).toBe(true);
    });
});
