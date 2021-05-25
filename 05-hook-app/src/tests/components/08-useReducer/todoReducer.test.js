import { todoReducer } from "../../../components/08-useReducer/todoReducer";
import { demoTodos } from "../../fixtures/demoTodos";

describe("pruebas en todoReducer", () => {
    test("debe de retornar el estado por defecto", () => {
        const state = todoReducer(demoTodos, {});
        expect(state).toEqual(demoTodos);
    });
    test("debe de agregar un todo", () => {
        const newObj = {
            id: 3,
            desc: "Aprender NodeJS",
            done: false,
        };
        const action = {
            type: "add",
            payload: newObj,
        };
        const state = todoReducer(demoTodos, action);
        expect(state.length).toBe(3);
        expect(state).toEqual([...demoTodos, newObj]);
    });
    test("debe de borrar un todo", () => {
        const action = {
            type: "delete",
            payload: 1,
        };
        const stateDefault = todoReducer(demoTodos, {});

        const state = todoReducer(demoTodos, action);
        expect(state.length).toBe(stateDefault.length - 1);
    });
    test("debe de hacer un toggle en el todo", () => {
        const id = 1;
        const action = {
            type: "toggle",
            payload: id,
        };
        const state = todoReducer(demoTodos, action);
        expect(state[0].done).toBe(true);
        expect(state[1]).toEqual(demoTodos[1]);
    });
});
