import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { name, uid } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {

                event.id = body.event.id;
                event.user = {
                    name: name,
                    _id: uid
                }

                dispatch(eventAddNew(event));
            }
            console.log(body)
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActive = () => ({
    type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventUpdate(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
};


export const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

export const eventStartDeleting = () => {

    return async (dispatch, getState) => {

        const { activeEvent } = getState().calendar;
        const resp = await fetchConToken(`events/${activeEvent.id}`, {}, 'DELETE');
        const body = await resp.json();

        if (body.ok) {
            dispatch(eventDelete());
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const eventDelete = () => ({
    type: types.eventDelete,
});

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.events);


            if (body.ok) {
                dispatch(eventLoaded(events));
            } else {
                Swal.fire('Error', 'Error al obtener los eventos', 'error');
            }

        } catch (error) {
            console.log(error);
        }
        console.log('>?>>>')
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventCleaner = () => ({
    type: types.eventCleaner
});

