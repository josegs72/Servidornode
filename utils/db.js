const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

// enlace con mongoDB y base de datos//
const connect = () => {
    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

};
// Exportamos la función de conexión a la base de datos //
module.exports = connect;