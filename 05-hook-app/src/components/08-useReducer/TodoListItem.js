import React from "react";

export const TodoListItem = ({ todo, index, handleToggle, handleDelete }) => {
    return (
        <li key={todo.id} className='list-group-item'>
            <p
                className={`${todo.done && "complete"}`}
                onClick={() => {
                    handleToggle(todo.id);
                }}
            >
                {index + 1} - {todo.desc}
            </p>
            <button
                onClick={() => handleDelete(todo.id)}
                className='btn btn-danger me-5'
            >
                Borrar
            </button>
        </li>
    );
};
