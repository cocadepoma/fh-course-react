import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("pruebas en <AddCategory/>", () => {
    // const setCategories = () => {};
    const setCategories = jest.fn();

    let wrapper = shallow(<AddCategory setCategories={setCategories} />);

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow(<AddCategory setCategories={setCategories} />);
    });

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de cambiar el input de texto", () => {
        const input = wrapper.find("input");
        const value = "Hola";
        // tenemos que pasarle el evento, para que nuestro componente no reciba un undefined
        // y pasarle un valor
        input.simulate("change", { target: { value } });

        const p = wrapper.find("p");
        expect(p.text().trim()).toBe(value);
    });

    test("no depe de hacer post onSubmit", () => {
        wrapper.find("form").simulate("submit", { preventDefault() {} });
        // Detecta si la función NO ha sido llamada
        expect(setCategories).not.toHaveBeenCalled();
    });

    test("debe de llamar el setCategories y limpiar el input", () => {
        const value = "Hola";
        wrapper.find("input").simulate("change", { target: { value } });
        wrapper.find("form").simulate("submit", { preventDefault() {} });
        expect(setCategories).toHaveBeenCalled();
        expect(setCategories).toHaveBeenCalledTimes(1);
        //Le decimos que se espera que setCategories, llame a una función
        expect(setCategories).toHaveBeenCalledWith(expect.any(Function));

        expect(wrapper.find("input").prop("value")).toBe("");
    });
});
