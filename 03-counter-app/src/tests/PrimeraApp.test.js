import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
//import { render } from "@testing-library/react";
import PrimeraApp from "../PrimeraApp";

describe("<Pruebas en <PrimeraApp/>", () => {
    // test('debe mostrar el mensaje "Hola, soy Goku', () => {
    //     const saludo = "Hola, soy Goku";
    //     const { getByText } = render(<PrimeraApp saludo={saludo} />);
    //     expect(getByText(saludo)).toBeInTheDocument();
    // });

    test("debe de mostrar <PrimeraApp/> correctamente", () => {
        const saludo = "Hola, soy Goku";
        const wrapper = shallow(<PrimeraApp saludo={saludo} />);

        expect(wrapper).toMatchSnapshot();
    });

    test("debe de mostrar el subtitulo enviado por props", () => {
        const saludo = "Hola, soy Goku";
        const subtitulo = "Soy un subtitulo";
        const wrapper = shallow(<PrimeraApp saludo={saludo} subtitulo={subtitulo} />);
        // Esto buscará un párrafo, podemos poner un iD #miId, o una clase .miclase.
        // Es como el document.querySelector
        const textParrafo = wrapper.find("p").text();

        expect(textParrafo).toBe(subtitulo);
    });
});
