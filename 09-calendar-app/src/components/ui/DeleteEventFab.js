import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDeleting } from "../../actions/events";

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventStartDeleting());
    };

    return (
        <button
            className='btn btn-danger fab-danger animate__animated animate__fadeIn'
            onClick={handleDelete}
        >
            <i className='fas fa-trash'></i>
            <span> Borrar evento</span>
        </button>
    );
};
