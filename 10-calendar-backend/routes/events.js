
const { Router } = require("express");

const { check } = require("express-validator");
const { fieldValidator } = require('../middlewares/field-validators');
const { validatorJWT } = require("../middlewares/jwt-validators");
const { isDate } = require('../helpers/isDate');

const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

const router = Router();


// Si vamos a usar un middleware en todos los ENDPOINT, podemos hacerlo así
// en lugar de ponerlo en cada ruta. Si el Token no es válido, las rutas que hay abajo no funcionarán
router.use(validatorJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear Evento
router.post('/', [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de fin es obligatoria').custom(isDate),
    fieldValidator
], createEvent);

// Actualizar evento
router.put('/:id', [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de fin es obligatoria').custom(isDate),
    fieldValidator
], updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;

// const { check } = require("express-validator");
/* Poniendo el middleware check indicando el campo a validar, no detiene que se ejecute el siguiente
** middleware, con lo que ponemos nuestro middleware personalizado fieldValidator para que detenga la ejecución
** en caso de haber algún error.
*/
