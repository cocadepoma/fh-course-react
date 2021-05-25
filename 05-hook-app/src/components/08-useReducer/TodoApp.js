import React, { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import "./styles.css";

export const TodoApp = () => {
    // TODOAPP LIST

    const init = () => {
        return JSON.parse(localStorage.getItem("todos")) || [];
        // return [
        //     { id: new Date().getTime(), desc: "Aprender React", done: false },
        // ];
    };

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleDelete = (id) => {
        const action = {
            type: "delete",
            payload: id,
        };
        dispatch(action);
    };

    const handleToggle = (id) => {
        dispatch({
            type: "toggle",
            payload: id,
        });
    };

    const handleAddTodo = (desc) => {
        dispatch({
            type: "add",
            payload: desc,
        });
    };
    return (
        <div>
            <h1>Todo APP ({todos.length})</h1>
            <hr />
            <div className='row'>
                <div className='col-md-7'>
                    <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
                </div>
                <div className='col-md-5'>
                    <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
        </div>
    );
};
