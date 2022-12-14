const multer = require("multer");
const path = require("path");
const createError = require("../errors/create-error");

// Creamos un array con los tipos de archivos que queremos aceptar //

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

// Creamos una función que comprueba si el tipo de archivo es válido y si no lo es, devuelve un error //

const fileFilter = (req, file, cb) => {
  
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(createError("El tipo de archivo no es aceptado"));
    } else {
        cb(null, true);
    }
};

// Creamos un objeto de configuración para multer //

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, '/tmp/');
    }
});


const upload = multer({
    storage,
    fileFilter
});

// Exportamos la función para poder usarla en el resto de rutas //

module.exports = upload;