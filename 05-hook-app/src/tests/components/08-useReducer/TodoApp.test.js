import { act } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";
import { TodoApp } from "../../../components/08-useReducer/TodoApp";
import { demoTodos } from "../../fixtures/demoTodos";

describe("puebas en <TodoApp/>", () => {
    const wrapper = shallow(<TodoApp />);

    // Crear la función para simular el llamado a localStorage
    Storage.prototype.setItem = jest.fn(() => {});

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de agregar un TODO", () => {
        // el mount de ENZYME se usa para utilizar toda la aplicación en general, en contexto
        const wrapper = mount(<TodoApp />);
        act(() => {
            wrapper.find("TodoAdd").prop("handleAddTodo")(demoTodos[0]);
            wrapper.find("TodoAdd").prop("handleAddTodo")(demoTodos[1]);
        });
        expect(wrapper.find("h1").text().trim()).toBe(`Todo APP (2)`);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    test("debe de eliminar un TODO", () => {
        wrapper.find("TodoAdd").prop("handleAddTodo")(demoTodos[0]);
        expect(wrapper.find("h1").text().trim()).toBe("Todo APP (1)");

        wrapper.find("TodoList").prop("handleDelete")(demoTodos[0].id);
        expect(wrapper.find("h1").text().trim()).toBe("Todo APP (0)");
    });
});
