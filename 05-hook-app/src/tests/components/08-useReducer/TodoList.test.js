const { shallow } = require("enzyme");
const { TodoList } = require("../../../components/08-useReducer/TodoList");
const { demoTodos } = require("../../fixtures/demoTodos");

describe("Pruebas en <TodoList/>", () => {
    const handleToggle = jest.fn();
    const handleDelete = jest.fn();
    const wrapper = shallow(<TodoList todos={demoTodos} handleToggle={handleToggle} handleDelete={handleDelete} />);

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
    test("debe de tener el número de elementos que se le ha pasado en un array", () => {
        expect(wrapper.find("TodoListItem").length).toBe(demoTodos.length);
        // Diferentes maneras de comprobar si es una función
        expect(typeof wrapper.find("TodoListItem").at(0).prop("handleDelete")).toBe("function");
        expect(wrapper.find("TodoListItem").at(0).prop("handleToggle")).toEqual(expect.any(Function));
    });
});
