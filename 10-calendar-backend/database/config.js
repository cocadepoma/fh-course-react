const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        // variable de entorno process.env.DB_CNN en .ENV
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("DB Online");
    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar la BBDD");
    }
};

module.exports = {
    dbConnection,
};
