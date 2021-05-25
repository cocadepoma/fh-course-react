import React from "react";
import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

import "./ui.css";

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(eventClearActive());
        dispatch(uiOpenModal());
    };

    return (
        <button className='btn btn-primary fab' onClick={handleClickNew}>
            <i className='fas fa-plus'></i>
        </button>
    );
};
