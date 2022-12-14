const express = require("express");
const imageToUri = require("image-to-uri");
const Movie = require("../models/Movie.js");
const createError = require("../utils/errors/create-error.js");
const isAuthPassport = require("../utils/middlewares/auth-passport.middleware.js");
const upload= require("../utils/middlewares/file.middleware.js");
const fs = require('fs');
const uploadToCloudinary = require("../utils/middlewares/cloudinary.middleware.js");

// Rutas de /api/movies //
const router = express.Router();
// Ruta de crear /api/movies //
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});
// Ruta de coger movies con id y passport//
router.get("/id/:id",[isAuthPassport], async (req, res, next) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findById(id);
    if (movies) {
      return res.status(200).json(movies);
    } else {
      next(createError("No existe un movie con el id indicado", 404));
    }
  } catch (err) {
    return next(err);
  }
});
// Ruta de coger movies por titulo//
router.get("/title/:title", async (req, res, next) => {
  const title = req.params.title;

  try {
    const movieByTitle = await Movie.find({ title });
    if (movieByTitle) {
      return res.status(200).json(movieByTitle);
    } else {
      next(createError("No existe el titulo indicado", 404));
    }
  } catch (err) {
    return next(err);
  }
});
// Ruta de coger movies por genero//
router.get("/genre/:genre", async (req, res, next) => {
  const genre = req.params.genre;

  try {
    const movieByGenre = await Movie.find({ genre });
    if (movieByGenre) {
      return res.status(200).json(movieByGenre);
    } else {
      next(createError("No existe el genero indicado", 404));
    }
  } catch (err) {
    return next(err);
  }
});
// Ruta de coger movies por año//
router.get("/year/:year", async (req, res, next) => {
  const year = req.params.year;

  try {
    const movieByYear = await Movie.find({ year });
    if (movieByYear) {
      return res.status(200).json(movieByYear);
    } else {
      next(createError("No existe el año indicado", 404));
    }
  } catch (err) {
    next(err);
  }
});
// Ruta de postear movies y un picture//
router.post("/",[upload.single('picture')] ,async (req, res, next) => {
  try {
    const picture  = req.file ? req.file.filename : null;
    const newMovie = new Movie({ ...req.body, picture });
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});
// Ruta de postear movies y un picture con image-to-uri//

router.post("/with-uri",[upload.single('picture')] ,async (req, res, next) => {
  try {
    const filePath = req.file ? req.file.path: null;
    const picture = imageToUri(filePath);
    const newMovie = new Movie({ ...req.body, picture });
    const createdMovie = await newMovie.save();
    await fs. unlinkSync(filePath);
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});
// Ruta de postear movies y un picture con cloudinary//

router.post("/to-cloud",[upload.single('picture'), uploadToCloudinary] ,async (req, res, next) => {
  try {
 
    const newMovie = new Movie({ ...req.body, picture: req.file_url });
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});

// Ruta de modificar movies con id //

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      next(
        createError("No se ha indicado el id del elemento a modificar", 400)
      );
    }
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return next(err);
  }
});
// Ruta de eliminar movies con id //

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("el elemento ha sido eliminado");
  } catch (err) {
    return next(err);
  }
});
//modulo exportado//

module.exports = router;
