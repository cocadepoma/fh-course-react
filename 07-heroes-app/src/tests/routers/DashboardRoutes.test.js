import React from "react";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { MemoryRouter } from "react-router-dom";

describe("pruebas en el component <DashboardRoutes />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: true, name: "Paco" },
    };

    // Si no aplicamos MEMORYROUTER, nos encontramos con múltiples errores
    // porque no tiene acceso al history entre otras
    // Nos puede dar error de LINK o ROUTE
    test("debe mostrarse correctamente", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe(contextValue.user.name);
    });
});
