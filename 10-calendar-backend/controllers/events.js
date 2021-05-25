const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {

    const events = await Event
        .find().populate('user', 'name');

    // populate rellenará el campo user del evento, con los datos que tenemos del user
    // en la tabla users, gracias a su ID, es como una relación SQL

    return res.status(200).json({
        ok: true,
        events,
    });
};

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        return res.json({
            ok: true,
            event: savedEvent,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error, Hable con el administrador",
        });
    }
};

const updateEvent = async (req, res = response) => {

    const { id } = req.params;
    const { uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese id no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tienes privilegios para editar el evento",
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        // Si no le indicamos el new: true, nos devuelve el objecto antiguo antes de actualizar
        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error, Hable con el administrador",
        });
    }

};

const deleteEvent = async (req, res = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese id no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tienes privilegios para eliminar el evento",
            });
        }

        // Si no le indicamos el new: true, nos devuelve el objecto antiguo antes de actualizar
        await Event.findByIdAndDelete(event);

        return res.status(200).json({
            ok: true,
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error, Hable con el administrador",
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
