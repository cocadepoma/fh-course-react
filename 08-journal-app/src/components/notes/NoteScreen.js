import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../actions/notes";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector((state) => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;

    const activeId = useRef(note.id);

    // Para detectar cuando refrescar la nota, nos creamos una referencia
    // Por ejemplo de su id y la guardarmos en un useRef. Después en el useEffect si detectamos
    // que son diferentes, las establecemos y reseteamos el form con la nueva nota y cambiamos el useRef
    // Como dependencias del useEffect establecemos la nota y el reset, así cada vez que
    // cambie la nota comprobará si son distintos los ID's y en caso de serlo, hará el reset y volverá
    // a cargar la data.
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    };

    return (
        <div className='notes__main-content animate__animated animate__fadeInRightBig animate__faster'>
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                    name='title'
                />
                <textarea
                    className='notes__textarea'
                    placeholder='What happened today'
                    value={body}
                    onChange={handleInputChange}
                    name='body'
                ></textarea>

                {note.url && (
                    <div className='notes__image'>
                        <img src={note.url} alt='landscape' />
                    </div>
                )}
            </div>

            <button className='btn btn-danger' onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};
