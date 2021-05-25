// const express = require("express");
// const router = express.Router;

/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
// middleware de validaciones
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validators");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validatorJWT } = require("../middlewares/jwt-validators");

const router = Router();

// ruta, middlewares, función
router.post(
    "/new",
    [
        check("name", "el nombre es obligatorio").not().isEmpty(),
        check("email", "el email es obligatorio").isEmail(),
        check("password", "el password debe de ser de 6 caracteres").isLength({ min: 6 }),
        fieldValidator,
    ],
    createUser
);

router.post(
    "/",
    [
        check("email", "el email es obligatorio").isEmail(),
        check("password", "el password debe de ser de 6 caracteres").isLength({ min: 6 }),
        fieldValidator,
    ],
    loginUser
);

router.get("/renew", validatorJWT, renewToken);

module.exports = router;
