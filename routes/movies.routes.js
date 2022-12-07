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

router.get('/id/:id', async (req, res) => {
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



router.get('/title/:title', async (req, res) => {
	const {title} = req.params;

	try {
		const movieByTitle = await Movie.find({ title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get('/genre/:genre', async (req, res) => {
	const {genre} = req.params;

	try {
		const movieByGenre = await Movie.find({ genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get('/year/:year', async (req, res) => {
	const year = req.params.year;

	try {
		const movies= await Movie.find({ year: {$gt:year} });
		return res.status(200).json(movies);
	} catch (err) {
		return res.status(500).json(err);
	}
});




module.exports = router