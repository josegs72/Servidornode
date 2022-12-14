const cloudinary = require ("cloudinary");
const fs = require ("fs");

// Configuración de Cloudinary //

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        const filePath = req.file.path;
        const image = await cloudinary.v2.uploader.upload(filePath);

        await fs.unlinkSync(filePath);

        req.file_url = image.secure_url;
        return next();
    } else {
        return next();
    }
};

// Exportamos la función para poder usarla en el resto de rutas //

module.exports = uploadToCloudinary;