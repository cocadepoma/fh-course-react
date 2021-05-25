import React from "react";
import PropTypes from "prop-types";

const PrimeraApp = ({ saludo, subtitulo }) => {
    const persona = {
        nombre: "Paco",
        edad: 32,
    };

    return (
        <>
            <h1>{saludo}</h1>
            {/* <pre>{JSON.stringify(persona, null, 3)}</pre> */}
            <p>{subtitulo}</p>
        </>
    );
};

PrimeraApp.propTypes = {
    saludo: PropTypes.string.isRequired,
};
PrimeraApp.defaultProps = {
    subtitulo: "Soy un subtitulo",
};
export default PrimeraApp;
