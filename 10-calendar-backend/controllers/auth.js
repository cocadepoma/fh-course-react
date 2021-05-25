const {
    response
} = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
    generarJWT
} = require("../helpers/jwt");

// Lib hash password npm install bcryptjs
const createUser = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {

        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario existe con ese correo",
            });
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync(); // Aquí le podemos indicar el nivel del encriptación. Default: 10

        user.password = bcrypt.hashSync(password, salt); // Hasheo del pwd

        await user.save();

        // Generar Json Web Token JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });

    }
};

const loginUser = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email",
            });
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        // Generar Json Web Token JWT
        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const renewToken = async (req, res = response) => {

    const {
        uid,
        name
    } = req;

    // Generar Json Web Token JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });

};

module.exports = {
    createUser,
    loginUser,
    renewToken
};