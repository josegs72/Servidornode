const createError = (msg, status) => {
    const err = new Error(msg);
    err.status = status;
    return err;
};

module.exports = createError;


//Creamos el archivo de errores en utils\errors y lo exportamos para usarlo en el auth.routes.js //