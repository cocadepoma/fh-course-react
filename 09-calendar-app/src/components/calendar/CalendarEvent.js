import React from "react";

export const CalendarEvent = ({ event = { title: "", user: "" } }) => {
    const { title, user } = event;
    return (
        <div>
            <span>{title} -</span>
            <strong> {user.name}</strong>
        </div>
    );
};
