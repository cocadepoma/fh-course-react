import React from "react";
import { useForm } from "../../hooks/useForm";

export const TodoAdd = ({ handleAddTodo }) => {
    const [{ description }, handleInputChange, reset] = useForm({
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (description.trim().length <= 1) {
            return;
        }

        handleAddTodo({
            id: new Date().getTime(),
            desc: description,
            done: false,
        });

        // reset();
    };
    return (
        <>
            <h4>Agregar TODO</h4>
            <hr />

            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                <input
                    onChange={handleInputChange}
                    className='form-control'
                    type='text'
                    name='description'
                    value={description}
                    placeholder='Aprender...'
                    autoComplete='off'
                />

                <button type='submit' className='btn btn-block btn-outline-primary mt-1'>
                    Agregar
                </button>
            </form>
        </>
    );
};
