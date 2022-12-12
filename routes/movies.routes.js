const express = require("express");
const Movie = require("../models/Movie.js");
const createError = require("../utils/errors/create-error.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

router.get("/id/:id", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie({ ...req.body });
    if (!newMovie) {
      next(createError("No se ha indicado el elemento a crear", 400));
    }
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});

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

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("el elemento ha sido eliminado");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
