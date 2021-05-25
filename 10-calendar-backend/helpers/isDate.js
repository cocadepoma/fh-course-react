const moment = require('moment');

//const isDate = (value, { req, location, path }) => {


const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false; // Si no hay fecha al retornar false al validator, sabe que no está correcto
    }

    const date = moment(value);

    if (date.isValid) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}