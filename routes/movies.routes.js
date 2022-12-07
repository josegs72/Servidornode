const express = require('express');
const Movie = require('../models/Movie.js');


const router = express.Router();

router.get('/' , async (req ,res,) => {
  try{
   const movies = await Movie.find();
   return res.status(200).json(movies);
  }catch (err){
   return res.status(500).json(err);
  }
});

router.get('/id/:id', async (req, res,next) => {
	const id = req.params.id
	try {
		const movies = await Movie.findById(id);
		if (movies) {
			return res.status(200).json(movies);
		} else {
			return res.status(404).json('No hay pelicula con este id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});



router.get('/title/:title', async (req, res,next) => {
	const title = req.params.title;

	try {
		const movieByTitle = await Movie.find({ title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get('/genre/:genre', async (req, res,next) => {
	const genre = req.params.genre;

	try {
		const movieByGenre = await Movie.find({genre});
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get('/year/:year', async (req, res,next) => {
	const year = req.params.year;

	try {
		const movies= await Movie.find({ year: {$gt:year} });
		return res.status(200).json(movies);
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post('/', async (req, res, next) => {
    try {
        const newMovie = new Movie({...req.body});
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('el elemento ha sido eliminado');
    } catch (error) {
        return next(error);
    }
});





module.exports = router;