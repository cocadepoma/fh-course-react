import React from "react";
import { shallow } from "enzyme";
import HookApp from "../HookApp";

describe("pruebas en <HookApp/>", () => {
    test("Comprobar que el componente se imprime correctamente", () => {
        const wrapper = shallow(<HookApp />);

        expect(wrapper).toMatchSnapshot();
    });
});
