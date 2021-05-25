import { mount } from "enzyme";
import React from "react";
import { HomeScreen } from "../../../components/09-useContext/HomeScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("pruebas en <HomeScreen/>", () => {
    const user = {
        name: "Paco",
        email: "paco@gmail.com",
    };
    // shallow() renderiza el primer componente, con lo que HomeScreen lo mostrará <HomeScreen/>
    // para que renderize todo, tenemos que hacerlo con mount
    const wrapper = mount(
        <UserContext.Provider value={{ user }}>
            <HomeScreen />
        </UserContext.Provider>
    );
    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
