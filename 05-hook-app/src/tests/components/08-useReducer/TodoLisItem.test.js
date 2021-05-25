import { TodoListItem } from "../../../components/08-useReducer/TodoListItem";
import { shallow } from "enzyme";
import { demoTodos } from "../../fixtures/demoTodos";

describe("Pruebas en <TodoLisItem/>", () => {
    const todo = demoTodos[0];

    const handleToggle = jest.fn();
    const handleDelete = jest.fn();
    const index = 0;
    const wrapper = shallow(
        <TodoListItem todo={todo} index={index} handleToggle={handleToggle} handleDelete={handleDelete} />
    );

    test("debe de mostrarse corectamente", () => {
        //Snapshot
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de llamar la función handleDelete", () => {
        wrapper.find("p").simulate("click");
        expect(handleToggle).toHaveBeenCalledWith(todo.id);
        expect(handleDelete).not.toHaveBeenCalled();
    });
    test("debede llamar la función handleToggle", () => {
        wrapper.find("button").simulate("click");
        expect(handleDelete).toHaveBeenCalledWith(todo.id);
        expect(handleToggle).not.toHaveBeenCalled();
    });
    test("debe de mostrar el texto correctamente", () => {
        expect(wrapper.find("p").text().trim()).toBe(`${index + 1} - ${todo.desc}`);
    });
    test("debe de tener la clase complete, si el todo.done está en true", () => {
        todo.done = true;
        const wrapper = shallow(
            <TodoListItem todo={todo} index={index} handleToggle={handleToggle} handleDelete={handleDelete} />
        );
        expect(wrapper.find("p").hasClass("complete")).toBe(true);
    });
});
