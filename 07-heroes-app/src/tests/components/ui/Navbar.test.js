import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { NavBar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

describe("pruebas en <Navbar/>", () => {
    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: true, name: "Paco" },
    };
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <NavBar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe(contextValue.user.name);
    });

    test("debe de llamar logout y usar history", () => {
        wrapper.find("button").prop("onClick")();

        expect(contextValue.dispatch).toHaveBeenLastCalledWith({ type: types.logout });
        expect(historyMock.replace).toHaveBeenCalledWith("/login");
    });
});
