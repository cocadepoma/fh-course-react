import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";

import CounterApp from "../CounterApp";

describe("pruebas en <CounterApp/>", () => {
    let wrapper = shallow(<CounterApp />);

    beforeEach(() => {
        wrapper = shallow(<CounterApp />);
    });

    test("probar que el valor por defecto de 'value' es 10", () => {
        expect(wrapper).toMatchSnapshot();
        const numero = parseInt(wrapper.find("h2").text().trim());
        expect(numero).toBe(10);
    });

    test("probar que el 'value' de 100 pasado como prop, corresponde", () => {
        const numero = 100;

        const wrapper = shallow(<CounterApp value={numero} />);
        const numeroDom = parseInt(wrapper.find("h2").text().trim());

        expect(numeroDom).toBe(numero);
    });

    test("debe de incrementar el contador en 1 por cada click", () => {
        // const btn1 = wrapper.find("button").at(0);
        // console.log(btn1.html());
        const numeroDom = parseInt(wrapper.find("h2").text().trim());
        wrapper.find("button").at(0).simulate("click");
        const numeroDom2 = parseInt(wrapper.find("h2").text().trim());

        expect(numeroDom2).toBe(numeroDom + 1);
    });
    test("debe de decrementar el contador en 1 por cada click", () => {
        const numeroDom = parseInt(wrapper.find("h2").text().trim());
        wrapper.find("button").at(2).simulate("click");
        const numeroDom2 = parseInt(wrapper.find("h2").text().trim());

        expect(numeroDom2).toBe(numeroDom - 1);
    });

    test("debe de resetear el 'value' al valor por defecto pasado como prop", () => {
        const valor = 105;
        const wrapper = shallow(<CounterApp value={valor} />);
        wrapper.find("button").at(0).simulate("click");
        wrapper.find("button").at(0).simulate("click");
        wrapper.find("button").at(1).simulate("click");
        const numeroDom = parseInt(wrapper.find("h2").text().trim());

        expect(numeroDom).toBe(valor);
    });
});
