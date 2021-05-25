const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config(); // npm i dotenv

// Variables de entorno. Crear un archivo ( .env ) y establecer PORT=4000
// Despues hay que instalar la dependiencia "npm i dotenv" y ya tendremos acceso
// Deberemos de iniciar con "require("dotenv").config()" y ya tendremos acceso.
// CON console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// Todo lo que en haya en el archivo /route/auth, lo va a habilitar
// en la ruta /api/auth
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor funcionando en puerto ${process.env.PORT}`);
});
