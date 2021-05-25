import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
const { mount } = require("enzyme");
const { HeroeScreen } = require("../../../components/heroes/HeroeScreen");
// Para poder simular los params por URL hay que envolver el componente en una
// Route fictia, en la que le indicamos el path, y el componente que debe renderizar
// Este Route debe de ir envuelto en un MemoryRouter inicializado con initialEntries
// indicando el path con los params.
describe("pruebas en <HeroeScreen/>", () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };

    const wrapper = mount(
        <MemoryRouter initialEntries={["/hero"]}>
            <HeroeScreen history={historyMock} />
        </MemoryRouter>
    );

    test("debe de mostrar el componente redirect si no hay argumentos en el URL", () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });

    test("debe de regresar a la pantalla anterior con PUSH", () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    path='/hero/:heroeId'
                    component={() => <HeroeScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(historyMock.push).toBeCalledTimes(1);
        expect(historyMock.push).toBeCalledWith("/");
        expect(historyMock.goBack).not.toBeCalled();
    });

    test("debe de redireccionar a la pantalla anterior con GOBACK", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    path='/hero/:heroeId'
                    component={() => <HeroeScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(historyMock.goBack).toBeCalled();
        expect(historyMock.push).not.toBeCalled();
    });
    test("debe de mostrar un heroe si el parámetro existe", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path='/hero/:heroeId' component={HeroeScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".row").exists()).toBe(true);
    });
    test("Debe de llamar el redirect si el heroe no existe", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spiderssss"]}>
                <Route path='/hero/:heroeId' component={HeroeScreen} />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe("");
    });
});
