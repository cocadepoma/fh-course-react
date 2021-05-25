const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name,
        };
        /* Para genera un jwt, instalamos la librería.
         ** Importamos jsonwebtoken
         ** Generamos un Payload. Generalmente con el id y nombre del usuario.
         ** Ahora iniciamos con jwt.sign(), le pasamos el payload, la frase secreta, y al final
         ** un objeto con el tiempo en el que expirará el token */

        /* Después, recibe un callback en el que tenemos o bien el ERROR o el TOKEN */
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }

            resolve(token);
        });
    });
};

module.exports = {
    generarJWT,
};
