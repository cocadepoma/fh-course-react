import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { messages } from "../../helpers/calendar-messages-es";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActive, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { setDate } from "../../actions/dates";
moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    // Get events array from state REDUX
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    // Save last position in localStorage
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    // Open Form Modal
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };
    // On click, setActive the event
    const onSelectEvent = (calendarEvent) => {
        dispatch(eventSetActive(calendarEvent));
    };
    // When the view changes, save the position in localStorage
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const onSelectSlot = (e) => {
        dispatch(eventClearActive());
        if (e.action !== "doubleClick") {
            return;
        }
        const { start } = e;

        dispatch(setDate(start));
        dispatch(uiOpenModal());
    };

    // Events style
    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id) ? "#367CF7" : "#465660",
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
            color: "white",
        };
        return {
            style,
        };
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='calendar-screen'>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor='start'
                        endAccessor='end'
                        messages={messages}
                        eventPropGetter={eventStyleGetter}
                        components={{ event: CalendarEvent }}
                        onDoubleClickEvent={onDoubleClick}
                        onSelectEvent={onSelectEvent}
                        onView={onViewChange}
                        view={lastView}
                        onSelectSlot={onSelectSlot}
                        selectable={true}
                    />
                </div>
            </div>
            <CalendarModal />
            <AddNewFab />
            {activeEvent && <DeleteEventFab />}
        </div>
    );
};
