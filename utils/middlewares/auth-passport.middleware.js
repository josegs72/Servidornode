const createError = require("../errors/create-error");

// creamos una función que comprueba si el usuario está autenticado y si no lo está, devuelve un error  //
const isAuthPassport = (req, res, next) => {
    if (req.isAuthenticated()) {
       return next();
    } else {
     return next(createError('No tienes permisos',401));   
    }
};

// exportamos la función para poder usarla en el resto de rutas //
module.exports = isAuthPassport;