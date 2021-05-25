import React from "react";
import { mount } from "enzyme";
import { SearchScreen } from "../../../components/search/SearchScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("pruebas en <SearchScreen />", () => {
    test("debe de mostrarse correctamente con valores por defecto", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a Hero");
    });
    test("debe de recoger el param por la URL y mostrarlo en el input", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=green"]}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("input").prop("value")).toBe("green");
        expect(wrapper.find("HeroeCard").exists()).toBe(true);
    });

    test("debe de mostrar un error si no se muestra el hero", () => {
        const q = "greendwdwd";
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${q}`]}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find(".alert-danger").text().trim()).toBe(`The hero ${q} doesn't exists`);
        expect(wrapper).toMatchSnapshot();
    });
    test("debe de llamar el push del history", () => {
        const q = "green";
        const history = {
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${q}`]}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );
        wrapper.find("input").simulate("change", {
            target: {
                name: "searchText",
                value: q,
            },
        });
        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
        expect(history.push).toBeCalledWith(`?q=${q}`);
    });
});
