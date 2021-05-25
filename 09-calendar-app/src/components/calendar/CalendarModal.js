import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-modal";

import { useSelector, useDispatch } from "react-redux";

import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

import "./modal.css";
import { uiCloseModal } from "../../actions/ui";
import { eventClearActive, eventStartAddNew, eventStartUpdate } from "../../actions/events";
import { clearDate } from "../../actions/dates";

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement("#root");
}

const dateNow = moment().minutes(0).seconds(0).add(1, "hours");
const dateNowPlus1 = dateNow.clone().add(1, "hours");
const initEvent = {
    title: "",
    notes: "",
    start: dateNow.toDate(),
    end: dateNowPlus1.toDate(),
};

export const CalendarModal = () => {
    // Redux State
    const { modalOpen } = useSelector((state) => state.ui);
    const { activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    // Input dates form
    const [, setDateStart] = useState(dateNow.toDate());
    const [, setDateEnd] = useState(dateNowPlus1.toDate());

    // Date from doubleClick calendar
    const { activeDate } = useSelector((state) => state.date);

    // Input title
    const [titleValid, settitleValid] = useState(true);

    // Form values checker
    const [formValues, setFormValues] = useState(initEvent);

    // Form properties deconstruction
    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
            if (activeDate) {
                setFormValues({
                    ...formValues,
                    start: activeDate,
                    end: moment(activeDate).minutes(0).seconds(0).add(1, "hour").toDate(),
                });
            }
        }
    }, [activeEvent, activeDate]); // eslint-disable-line react-hooks/exhaustive-deps

    // Form Submit
    const handleSubmitForm = (e) => {

        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentEnd.isSameOrBefore(momentStart)) {
            Swal.fire({
                title: "Error!",
                text: "La fecha de fin debe de ser posterior a la fecha de inicio",
                icon: "error",
                confirmButtonText: "Cool",
                timer: 2500,
            });
            document.querySelector(".end-date").classList.add("is-invalid");
            document.querySelector(".end-date").focus();
            return;
        }
        if (title.trim().length < 2) {
            return settitleValid(false);
        }

        // If there is an active element => UPDATE Event
        // If activeEvent === null, It's a new Event
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }
        // TODO: Realizar grabación BBDD
        settitleValid(true);
        closeModal();
    };

    const handleInputChange = ({ target }) => {
        if (target.name === "title" && target.value.trim().length >= 2) {
            settitleValid(true);
        }

        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    // Close Form Modal
    const closeModal = () => {
        dispatch(uiCloseModal());
        //setDateStart(dateNow.toDate());
        //setDateEnd(dateNowPlus1.toDate());
        setTimeout(() => {
            dispatch(eventClearActive());
            dispatch(clearDate());
            setFormValues(initEvent);
        }, 300);
    };

    return (
        <Modal
            isOpen={modalOpen}
            className='modal'
            onRequestClose={closeModal}
            contentLabel='Example Modal'
            closeTimeoutMS={200}
            ariaHideApp={!process.env.NODE_ENV === 'test'}
        >
            <h1 className='mb-3'>{activeEvent ? "Editar evento" : "Nuevo evento"}</h1>

            <form className='container' onSubmit={handleSubmitForm}>
                <div className='mb-3'>
                    <label className='mb-1'>Fecha y hora inicio</label>
                    <DateTimePicker
                        className='form-control start-date'
                        onChange={handleStartDateChange}
                        value={start}
                    />
                </div>

                <div className='mb-3'>
                    <label className='mb-1'>Fecha y hora fin</label>
                    <DateTimePicker
                        className='form-control end-date'
                        onChange={handleEndDateChange}
                        value={end}
                        minDate={start}
                    />
                </div>

                <div className='mb-3 d-flex flex-column justify-content-evenly'>
                    <label className='mb-1'>Titulo y notas</label>
                    <input
                        type='text'
                        className={`form-control ${!titleValid && "is-invalid"}`}
                        placeholder='Título del evento'
                        name='title'
                        autoComplete='off'
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id='emailHelp' className='form-text text-muted input-info'>
                        Una descripción corta
                    </small>
                </div>

                <div className='mb-5 d-flex flex-column justify-content-evenly'>
                    <textarea
                        type='text'
                        className='form-control'
                        placeholder='Notas'
                        rows='5'
                        name='notes'
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id='emailHelp' className='form-text text-muted input-info'>
                        Información adicional
                    </small>
                </div>

                <button type='submit' className='btn btn-outline-primary btn-block float-end'>
                    <i className='far fa-save'></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
