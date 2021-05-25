import { shallow } from "enzyme";
import React from "react";
import { TodoAdd } from "../../../components/08-useReducer/TodoAdd";

describe("pruebas en <TodoApp/>", () => {
    const handleAddTodo = jest.fn();

    const wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />);

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("No debe de llamar handleAddTodo", () => {
        //wrapper.find("button").simulate("click");
        const formSubmit = wrapper.find("form").prop("onSubmit");
        formSubmit({
            preventDefault() {},
        });

        expect(handleAddTodo).not.toHaveBeenCalled();
        // Las 2 podrían servir
        expect(handleAddTodo).toHaveBeenCalledTimes(0);
    });

    test("debe de llamar la función handleAddTodo", () => {
        const value = "Aprender Ionic";

        wrapper.find("input").simulate("change", {
            target: {
                value,
                name: "description",
            },
        });

        const formSubmit = wrapper.find("form").prop("onSubmit");
        formSubmit({
            preventDefault() {},
        });

        expect(handleAddTodo).toHaveBeenCalled();
        expect(handleAddTodo).toHaveBeenCalledTimes(1);
        expect(handleAddTodo).toHaveBeenCalledWith(expect.any(Object));
        expect(handleAddTodo).toHaveBeenCalledWith({
            id: expect.any(Number),
            desc: value,
            done: false,
        });

        expect(wrapper.find("input").prop("value")).toBe(value);
    });
});
